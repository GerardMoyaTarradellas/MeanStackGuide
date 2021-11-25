import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
   */
  constructor(private http_client: HttpClient) {}

  /**
   * Genera una copia de la lista de posts y la devuelve.
   * @returns Devuelve una array de posts.
   */
  public getPosts() {
    this.http_client
      .get<{ message: string; posts: any[] }>('http://localhost:3000/api/posts')
      .pipe(
        map((data) => {
          return data.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
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
  public addPost(new_post: Post): void {
    this.http_client
      .post<{ message: string }>('http://localhost:3000/api/posts', new_post)
      .subscribe((data) => {
        console.log(data);
        this.posts.push(new_post);
        this.postsUpdated.next([...this.posts]);
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
}
