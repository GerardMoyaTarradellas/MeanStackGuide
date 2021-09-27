import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  /**
   * Constructor de la clase
   * @param post_service Servicio de posts de la aplicación.
   */
  constructor(private post_service: PostService) {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {}

  /**
   * Se llama cuando se hace click en el botón de guardar.
   * @param form Form con la información del nuevo post.
   */
  public onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const new_post: Post = {
      title: form.value.title,
      content: form.value.content,
    };

    this.post_service.addPost(new_post);
  }
}
