import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  /** Define si el componente esta cargando información */
  public is_loading: boolean = false;

  /**
   * Logea al usuario introducido.
   */
  public onSignUp(form: NgForm) {}
}
