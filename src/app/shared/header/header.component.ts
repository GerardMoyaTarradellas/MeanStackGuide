import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  /** Subscripción a la autenticación */
  private auth_subscription: Subscription;
  /** Define si el usuario esta autenticado o no. */
  public user_authenticated: boolean = false;

  /**
   * Constructor de la clase
   * @param auth_service Servicio de autenticación.
   */
  constructor(private auth_service: AuthService) {}

  /**
   * Se llama cada vez que el componente se inicializa
   */
  ngOnInit(): void {
    this.auth_subscription = this.auth_service
      .getAuthStatusListener()
      .subscribe((is_authenticated) => {
        this.user_authenticated = is_authenticated;
      });
  }

  /**
   * Se llama cada vez que el componente se destruye.
   */
  ngOnDestroy(): void {
    this.auth_subscription.unsubscribe();
  }
}
