import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { IPost } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  /** Lista de posts utilizados en el componente. */
  public posts: IPost[] = [];
  /** Define si el componente esta cargando o no. */
  public is_loading: boolean = false;
  /** Numero total de post s */
  public total_post: number = 0;
  /** Numero total de post mostrados en el componente */
  public post_per_page: number = 2;
  /** Opciones para el númeroo total de post mostrados en el componente */
  public post_size_options: number[] = [1, 2, 5];
  /** Defines si el usuario esta autenticado */
  public user_authenticated: boolean = false;
  /** Id del usuario */
  public user_id: string;

  /** Pagina actual del paginador. */
  private current_page: number = 1;
  /** Subscripción de la autenticación */
  private auth_subscription: Subscription;

  /** Subscripción a los posts. */
  private posts_subscription: Subscription;

  /**
   * Constructor de la clase
   * @param post_service Servicio de posts de la aplicación.
   * @param auth_service Servicio de autenticación
   */
  constructor(
    private post_service: PostService,
    private auth_service: AuthService
  ) {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {
    this.is_loading = true;
    this.post_service.getPosts(this.post_per_page, this.current_page);
    this.user_id = this.auth_service.getUserId();
    this.posts_subscription = this.post_service
      .getPostUpdateListener()
      .subscribe((response) => {
        this.posts = response.posts;
        this.total_post = response.max_posts;
        this.is_loading = false;
      });
    this.auth_subscription = this.auth_service
      .getAuthStatusListener()
      .subscribe((is_authenticated) => {
        this.user_authenticated = is_authenticated;
        this.user_id = this.auth_service.getUserId();
      });
    this.user_authenticated = this.auth_service.getIsAuth();
  }

  /**
   * Se llama cuando el componente se debe eliminar.
   */
  ngOnDestroy(): void {
    this.posts_subscription.unsubscribe();
    this.auth_subscription.unsubscribe();
  }

  /**
   * Elimina el post.
   * @param post Post que se desea eliminar.
   */
  public onDelete(post: IPost) {
    this.post_service.deleteOne(post).subscribe(
      () => {
        this.post_service.getPosts(this.post_per_page, this.current_page);
      },
      (error) => {
        this.is_loading = false;
      }
    );
  }

  /**
   * Se ejecuta al cambiar el paginador.
   * @param event Evento nativo.
   */
  public onChangedPage(event: PageEvent) {
    this.is_loading = true;
    this.current_page = event.pageIndex + 1;
    this.post_per_page = event.pageSize;
    this.post_service.getPosts(this.post_per_page, this.current_page);
  }
}
