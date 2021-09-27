import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  /** Lista de posts utilizados en el componente. */
  @Input() public posts: Post[];

  /**
   * Constructor de la clase
   * @param post_service Servicio de posts de la aplicación.
   */
  constructor(private post_service: PostService) {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {}
}
