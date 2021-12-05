import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /** Define si el componente esta cargando información */
  public is_loading: boolean = false;

  /**
   * Constructor del componente.
   * @param auth_service Servicio de autenticación
   */
  constructor(private auth_service: AuthService) {}

  /**
   * Logea al usuario introducido.
   * @param form Form del componente.
   */
  public onLogIn(form: NgForm) {
    this.auth_service.login({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
