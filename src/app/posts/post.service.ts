import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost } from './post.interface';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.API_URL + '/posts/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  /** Lista de todos los posts. */
  private posts: IPost[] = [];
  /** Genera un observable cada vez que se añade un nuevo post. */
  private postsUpdated: Subject<{ posts: IPost[]; max_posts: number }> =
    new Subject<{ posts: IPost[]; max_posts: number }>();

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
  public getPost(id: string): Observable<IPost | undefined> {
    return this.http_client
      .get<{ message: string; post: any }>(BACKEND_URL + id)
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
   * @param page_size Número de posts que se desean obtener por página.
   * @param current_page Número de la página actual.
   * @returns Devuelve una array de posts.
   */
  public getPosts(page_size: number, current_page: number) {
    const query_params = `?page_size=${page_size}&page=${current_page}`;
    this.http_client
      .get<{ message: string; posts: any[]; max_posts: number }>(
        BACKEND_URL + query_params
      )
      .pipe(
        map((data) => {
          return {
            posts: data.posts.map((post) => this.mapServerPost(post)),
            max_posts: data.max_posts,
          };
        })
      )
      .subscribe((response) => {
        this.posts = response.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          max_posts: response.max_posts,
        });
      });
  }

  /**
   * Permite lincarse al observable de posts.
   * @returns Devuelve el observable de los posts.
   */
  public getPostUpdateListener(): Observable<{
    posts: IPost[];
    max_posts: number;
  }> {
    return this.postsUpdated.asObservable();
  }

  /**
   * Añade un nuevo post a la lista de posts.
   * @param new_post Post que desea añadir.
   */
  public addPost(new_post: IPost, image: File): void {
    const post_data = new FormData();
    post_data.append('title', new_post.title);
    post_data.append('content', new_post.content);
    post_data.append('image', image, new_post.title);

    this.http_client
      .post<{ message: string; post: any }>(BACKEND_URL, post_data)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  /**
   * Elimina el post introducido
   * @param post Post que se desea eliminar.
   */
  public deleteOne(post: IPost) {
    return this.http_client.delete<{ message: string }>(BACKEND_URL + post.id);
  }

  /**
   * Mapea la estructura de posts de la db con la del front.
   * @param post Post de la db
   * @returns Devuelve un post con la estructura del front.
   */
  private mapServerPost(post: any): IPost {
    return {
      id: post._id,
      title: post.title,
      content: post.content,
      image_path: post.image_path,
      creator: post.creator,
    };
  }

  /**
   * Permite modificar un post existente en la db
   * @param post Post que se ha modificado.
   * @param image Imagen ligada al post.
   */
  public updatePost(post: IPost, image: File | string): void {
    let post_data: IPost | FormData;
    if (typeof image === 'object') {
      post_data = new FormData();
      post_data.append('id', post.id);
      post_data.append('title', post.title);
      post_data.append('content', post.content);
      post_data.append('image', image, post.image_path);
      post_data.append('creator', image, post.creator);
    } else {
      post_data = post;
    }

    this.http_client
      .put<{ message: string; post: any }>(BACKEND_URL + post.id, post_data)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
