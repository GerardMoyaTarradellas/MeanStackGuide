import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
  getPosts() {
    this.http_client
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((data) => {
        this.posts = data.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  /**
   * Permite lincarse al observable de posts.
   * @returns Devuelve el observable de los posts.
   */
  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  /**
   * Añade un nuevo post a la lista de posts.
   * @param new_post Post que desea añadir.
   */
  addPost(new_post: Post): void {
    this.http_client
      .post<{ message: string }>('http://localhost:3000/api/posts', new_post)
      .subscribe((data) => {
        console.log(data);
        this.posts.push(new_post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
