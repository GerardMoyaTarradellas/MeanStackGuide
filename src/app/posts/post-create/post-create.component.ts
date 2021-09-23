import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
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
  public onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const new_post: Post = {
      title: form.value.title,
      content: form.value.content,
    };

    this.post_created.emit(new_post);
  }
}
