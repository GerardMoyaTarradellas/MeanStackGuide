import { Injectable } from '@angular/core';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  /** Lista de todos los posts. */
  posts: Post[] = [];

  /**
   * Constructor del servicio.
   */
  constructor() {}

  /**
   * Genera una copia de la lista de posts y la devuelve.
   * @returns Devuelve una array de posts.
   */
  getPosts(): Post[] {
    return [...this.posts];
  }

  /**
   * Añade un nuevo post a la lista de posts.
   * @param new_post Post que desea añadir.
   */
  addPost(new_post: Post): void {
    this.posts.push(new_post);
  }
}
