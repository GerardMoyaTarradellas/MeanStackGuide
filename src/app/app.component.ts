import { Component } from '@angular/core';
import { Post } from './posts/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** Lista de los posts mostrados */
  public posts: Post[] = [];

  /**
   * Se llama cada vez que se genera un nuevo post.
   * @param post Nuevo post.
   */
  onPostCreated(post: Post) {
    this.posts.push(post);
  }
}
