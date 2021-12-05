import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { IAuth } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Token del usuario */
  private token: string = '';
  /** Define si se ha hecho el proceso de autenticación */
  private auth_status: Subject<boolean> = new Subject<boolean>();

  /**
   * Constructor del servicio.
   * @param http_client Servicio http
   * @param router Router de la aplicación
   */
  constructor(private http_client: HttpClient, private router: Router) {}

  /**
   * Crea un nuevo usuario.
   * @param user_data Datos del usuario.
   */
  public createUser(user_data: IAuth) {
    this.http_client
      .post('http://localhost:3000/api/user/signup', user_data)
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Devuelve un observable referente al estado de autenticación de la sesión.
   */
  public getAuthStatusListener(): Observable<boolean> {
    return this.auth_status.asObservable();
  }

  /**
   * Devuelve el token del usuario
   * @returns
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * Logea al usuario.
   * @param user_data Datos del usuario.
   */
  public login(user_data: IAuth) {
    this.http_client
      .post<{ message: string; token: string }>(
        'http://localhost:3000/api/user/login',
        user_data
      )
      .subscribe((response) => {
        this.token = response.token;
        this.auth_status.next(true);
        this.router.navigate(['/']);
      });
  }
}
