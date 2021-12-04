import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /** Define si el componente esta cargando información */
  public is_loading: boolean = false;

  /**
   * Logea al usuario introducido.
   */
  public onLogin(form: NgForm) {}
}
