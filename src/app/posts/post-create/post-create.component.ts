import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  /** New content of the post. */
  public new_content = '';
  /** New title of the post. */
  public new_title = '';
  /** Se ejecuta cuando se ha generado un nuevo post. */
  @Output() public post_created: EventEmitter<Post> = new EventEmitter();

  /**
   * Constructor de la clase
   */
  constructor() {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {}

  /**
   * Se llama cuando se hace click en el botón de guardar.
   */
  public onAddPost() {
    const new_post: Post = {
      title: this.new_title,
      content: this.new_content,
    };

    this.post_created.emit(new_post);
  }
}
