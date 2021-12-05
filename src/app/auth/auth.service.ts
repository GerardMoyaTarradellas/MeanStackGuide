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
  /** Define si el usuario esta autenticado */
  private is_authenticated: boolean = false;
  /** Timer del token */
  private timer: any;

  /**
   * Constructor del servicio.
   * @param http_client Servicio http
   * @param router Router de la aplicación
   */
  constructor(private http_client: HttpClient, private router: Router) {}

  /**
   * Autologea al usuario.
   */
  public autoAuth() {
    const data = this.getAuthData();

    if (data) {
      const expires_in = data.expiration.getTime() - new Date().getTime();

      if (expires_in > 0) {
        this.token = data.token;
        this.is_authenticated = true;
        this.auth_status.next(true);
        this.setAuthTimer(expires_in);
        this.router.navigate(['/']);
      }
    }
    this.router.navigate(['/login']);
  }

  /**
   * Elimina todos los datos del local storage referente a la autenticación.
   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

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
   * Coge los datos de logeado del localstorage.
   * @returns
   */
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if (token && expiration) {
      return {
        token: token,
        expiration: new Date(expiration),
      };
    } else {
      return;
    }
  }

  /**
   * Devuelve un observable referente al estado de autenticación de la sesión.
   */
  public getAuthStatusListener(): Observable<boolean> {
    return this.auth_status.asObservable();
  }

  /**
   * Define si el usuario esta autenticado.
   * @returns Devuelve una booleana
   */
  public getIsAuth(): boolean {
    return this.is_authenticated;
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
      .post<{ message: string; token: string; expires_in: number }>(
        'http://localhost:3000/api/user/login',
        user_data
      )
      .subscribe((response) => {
        this.token = response.token;
        if (response.token) {
          this.is_authenticated = true;
          this.setAuthTimer(response.expires_in);
          const expiration_date = new Date(
            new Date().getTime() + response.expires_in
          );
          this.saveAuthData(this.token, expiration_date);

          this.auth_status.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  /**
   * Deslogea al usuario.
   */
  public logOut() {
    this.token = null;
    this.is_authenticated = false;
    this.auth_status.next(false);
    this.router.navigate(['/login']);
    clearTimeout(this.timer);
  }

  /**
   * Guarda la información de autenticación.
   * @param token Token del usuario.
   * @param expiration_date Fecha en que el token caduca.
   */
  private saveAuthData(token: string, expiration_date: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration_date.toISOString());
  }

  /**
   * Define el timer de logeo
   * @param duration Numero de segundos en que el token caduca
   */
  private setAuthTimer(duration: number) {
    this.timer = window.setTimeout(() => {
      this.logOut();
    }, duration);
  }
}
