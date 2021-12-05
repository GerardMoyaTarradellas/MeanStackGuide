import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /**
   * Constructor del componente
   * @param auth_service Servicio de autenticación.
   */
  constructor(private auth_service: AuthService) {}

  /**
   * Método que se llama al inicializar el componente.
   */
  ngOnInit() {
    this.auth_service.autoAuth();
  }
}
