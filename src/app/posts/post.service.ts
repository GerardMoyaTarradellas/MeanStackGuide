import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PostListComponent } from './post-list/post-list.component';

import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  /** Lista de todos los posts. */
  private posts: Post[] = [];
  /** Genera un observable cada vez que se añade un nuevo post. */
  private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  /**
   * Constructor del servicio.
   * @param http_client Servicio http
   * @param router Router de la aplicación.
   */
  constructor(private http_client: HttpClient, private router: Router) {}

  /**
   * Devuelve el post con el id introducido.
   * @param id Id del post que se quiere obtener.
   */
  public getPost(id: string): Observable<Post | undefined> {
    return this.http_client
      .get<{ message: string; post: any }>(
        'http://localhost:3000/api/posts/' + id
      )
      .pipe(
        map((response: any) => {
          if (response.post) {
            return this.mapServerPost(response.post);
          } else {
            return undefined;
          }
        })
      );
  }

  /**
   * Genera una copia de la lista de posts y la devuelve.
   * @returns Devuelve una array de posts.
   */
  public getPosts() {
    this.http_client
      .get<{ message: string; posts: any[] }>('http://localhost:3000/api/posts')
      .pipe(
        map((data) => {
          return data.posts.map((post) => this.mapServerPost(post));
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  /**
   * Permite lincarse al observable de posts.
   * @returns Devuelve el observable de los posts.
   */
  public getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  /**
   * Añade un nuevo post a la lista de posts.
   * @param new_post Post que desea añadir.
   */
  public addPost(new_post: Post, image: File): void {
    const post_data = new FormData();
    post_data.append('title', new_post.title);
    post_data.append('content', new_post.content);
    post_data.append('image', image, new_post.title);

    this.http_client
      .post<{ message: string; post: any }>(
        'http://localhost:3000/api/posts',
        post_data
      )
      .subscribe((data) => {
        this.posts.push(this.mapServerPost(data.post));
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  /**
   * Elimina el post introducido
   * @param post Post que se desea eliminar.
   */
  public deleteOne(post: Post): void {
    this.http_client
      .delete<{ message: string }>('http://localhost:3000/api/posts/' + post.id)
      .subscribe(() => {
        const new_posts = this.posts.filter(
          (existing_post) => existing_post.id != post.id
        );
        this.posts = new_posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  /**
   * Mapea la estructura de posts de la db con la del front.
   * @param post Post de la db
   * @returns Devuelve un post con la estructura del front.
   */
  private mapServerPost(post: any): Post {
    return {
      id: post._id,
      title: post.title,
      content: post.content,
      image_path: post.image_path,
    };
  }

  /**
   * Permite modificar un post existente en la db
   * @param post Post que se ha modificado.
   * @param image Imagen ligada al post.
   */
  public updatePost(post: Post, image: File | string): void {
    let post_data: Post | FormData;
    if (typeof image === 'object') {
      post_data = new FormData();
      post_data.append('id', post.id);
      post_data.append('title', post.title);
      post_data.append('content', post.content);
      post_data.append('image', image, post.title);
    } else {
      post_data = post;
    }

    this.http_client
      .put<{ message: string; post: any }>(
        'http://localhost:3000/api/posts/' + post.id,
        post_data
      )
      .subscribe((response) => {
        const posts_updated = [...this.posts];
        const old_index = this.posts.findIndex(
          (existing_post) => existing_post.id == post.id
        );
        this.posts[old_index] = response.post;
        this.posts = posts_updated;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
}
