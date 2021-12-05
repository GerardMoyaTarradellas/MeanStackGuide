import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAuth } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Token del usuario */
  private token: string = '';

  /**
   * Constructor del servicio.
   * @param http_client Servicio http
   */
  constructor(private http_client: HttpClient) {}

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
      });
  }
}
