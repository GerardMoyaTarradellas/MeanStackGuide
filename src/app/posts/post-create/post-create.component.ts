import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  /** Modo del componente. */
  private mode: 'creation' | 'edition';
  /** Define si el componente esta cargando o no. */
  public is_loading: boolean = false;
  /** Id del post que se edita */
  public post: Post;

  /**
   * Constructor de la clase
   * @param post_service Servicio de posts de la aplicación.
   * @param router Router de la aplicación
   */
  constructor(
    private post_service: PostService,
    public router: ActivatedRoute
  ) {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {
    this.router.paramMap.subscribe((param_map: ParamMap) => {
      if (param_map.has('id')) {
        this.is_loading = true;
        this.mode = 'edition';
        this.post_service.getPost(param_map.get('id')).subscribe((response) => {
          if (response) {
            this.post = response;
          } else {
            this.mode = 'creation';
          }
          this.is_loading = false;
        });
      } else {
        this.mode = 'creation';
      }
    });
  }

  /**
   * Se llama cuando se hace click en el botón de guardar.
   * @param form Form con la información del nuevo post.
   */
  public onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.is_loading = true;
    if (this.mode == 'creation') {
      const new_post: Post = {
        id: '0',
        title: form.value.title,
        content: form.value.content,
      };

      this.post_service.addPost(new_post);
      form.resetForm();
    } else {
      this.post_service.updatePost(this.post);
    }
  }
}
