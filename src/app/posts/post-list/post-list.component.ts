import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  /** Lista de posts utilizados en el componente. */
  public post = [
    {
      title: 'Titol',
      content: 'Contingut',
    },
    {
      title: 'Titol',
      content: 'Contingut',
    },
    {
      title: 'Titol',
      content: 'Contingut',
    },
  ];

  /**
   * Constructor de la clase
   */
  constructor() {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {}
}
