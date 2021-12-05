import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { IPost } from '../post.interface';
import { PostService } from '../post.service';
import { mimeType } from '../../utils/validators/mime-type.validator';

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
  public post: IPost;
  /** Form del componente. */
  public form: FormGroup;
  /** Path de la imagen. */
  public image_preview: string;

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
    this.createForm();
    this.router.paramMap.subscribe((param_map: ParamMap) => {
      if (param_map.has('id')) {
        this.is_loading = true;
        this.mode = 'edition';
        this.post_service.getPost(param_map.get('id')).subscribe((response) => {
          if (response) {
            this.post = response;
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.image_path,
            });
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
   * Crea el form del componente
   */
  private createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  /**
   * Se ejecuta cada vez que se cambia el archivo seleccionado
   * @param event Evento recogido
   */
  public onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.image_preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Se llama cuando se hace click en el botón de guardar.
   */
  public onSavePost() {
    if (this.form.invalid) {
      return;
    }
    let new_post: IPost = {
      id: '0',
      title: this.form.value.title,
      content: this.form.value.content,
      image_path: null,
      creator: null,
    };

    this.is_loading = true;
    if (this.mode == 'creation') {
      this.post_service.addPost(new_post, this.form.value.image);
    } else {
      new_post.id = this.post.id;
      this.post_service.updatePost(new_post, this.form.value.image);
    }
    this.form.reset();
  }
}
