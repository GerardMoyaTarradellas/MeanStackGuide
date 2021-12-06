import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  /** Define si el componente esta cargando información */
  public is_loading: boolean = false;
  /** Subscripción de la autenticación */
  private auth_subscription: Subscription;

  /**
   * Constructor del componente.
   * @param auth_service Servicio de autenticación.
   */
  constructor(private auth_service: AuthService) {}

  /**
   * Se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    this.auth_subscription = this.auth_service
      .getAuthStatusListener()
      .subscribe(() => {
        this.is_loading = false;
      });
  }

  /**
   * Se ejecuta cada vez que se destruye el componente.
   */
  ngOnDestroy() {
    this.auth_subscription.unsubscribe();
  }

  /**
   * Logea al usuario introducido.
   * @param form Form del componente.
   */
  public onLogIn(form: NgForm) {
    this.is_loading = true;
    this.auth_service.login({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
