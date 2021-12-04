import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAuth } from '../auth.interface';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  /** Define si el componente esta cargando información */
  public is_loading: boolean = false;

  /**
   * Constructor del componente.
   * @param auth_service Servicio de autenticación.
   */
  constructor(private auth_service: AuthService) {}

  /**
   * Logea al usuario introducido.
   */
  public onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.auth_service.createUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
