import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  /** Text inputed in the text area. */
  public new_post = 'No content';
  /** Text inclided in the text arae. */
  public entered_value = '';

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
    this.new_post = this.entered_value;
  }
}
