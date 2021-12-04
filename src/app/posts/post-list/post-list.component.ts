import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  /** Lista de posts utilizados en el componente. */
  public posts: Post[] = [];
  /** Define si el componente esta cargando o no. */
  public is_loading: boolean = false;
  /** Numero total de post s */
  public total_post: number = 10;
  /** Numero total de post mostrados en el componente */
  public post_per_page: number = 2;
  /** Opciones para el númeroo total de post mostrados en el componente */
  public post_size_options: number[] = [1, 2, 5];

  /** Subscripción a los posts. */
  private posts_subscription: Subscription;

  /**
   * Constructor de la clase
   * @param post_service Servicio de posts de la aplicación.
   */
  constructor(private post_service: PostService) {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {
    this.is_loading = true;
    this.post_service.getPosts();
    this.posts_subscription = this.post_service
      .getPostUpdateListener()
      .subscribe((new_posts) => {
        this.posts = new_posts;
        this.is_loading = false;
      });
  }

  /**
   * Se llama cuando el componente se debe eliminar.
   */
  ngOnDestroy(): void {
    this.posts_subscription.unsubscribe();
  }

  /**
   * Elimina el post.
   * @param post Post que se desea eliminar.
   */
  public onDelete(post: Post) {
    this.post_service.deleteOne(post);
  }

  /**
   * Se ejecuta al cambiar el paginador.
   * @param event Evento nativo.
   */
  public onChangedPage(event: PageEvent) {}
}
