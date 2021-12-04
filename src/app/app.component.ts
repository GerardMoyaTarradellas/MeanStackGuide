import { Component } from '@angular/core';
import { IPost } from './posts/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** Lista de los posts mostrados */
  public posts: IPost[] = [];

  /**
   * Se llama cada vez que se genera un nuevo post.
   * @param post Nuevo post.
   */
  onPostCreated(post: IPost) {
    this.posts.push(post);
  }
}
