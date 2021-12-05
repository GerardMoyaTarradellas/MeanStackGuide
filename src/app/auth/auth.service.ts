import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { IAuth } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Define si se ha hecho el proceso de autenticación */
  private auth_status: Subject<boolean> = new Subject<boolean>();
  /** Define si el usuario esta autenticado */
  private is_authenticated: boolean = false;
  /** Timer del token */
  private timer: any;
  /** Token del usuario */
  private token: string = '';
  /** Id del usuario logeado */
  private user_id: string = '';

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
        this.user_id = data.user_id;
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
    const user_id = localStorage.getItem('user_id');

    if (token && expiration) {
      return {
        token: token,
        expiration: new Date(expiration),
        user_id: user_id,
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
   * Devuelve el ID del usuario
   */
  public getUserId(): string {
    return this.user_id;
  }

  /**
   * Logea al usuario.
   * @param user_data Datos del usuario.
   */
  public login(user_data: IAuth) {
    this.http_client
      .post<{
        message: string;
        token: string;
        expires_in: number;
        user_id: string;
      }>('http://localhost:3000/api/user/login', user_data)
      .subscribe((response) => {
        this.token = response.token;
        if (response.token) {
          this.is_authenticated = true;
          this.user_id = response.user_id;
          this.setAuthTimer(response.expires_in);
          const expiration_date = new Date(
            new Date().getTime() + response.expires_in
          );
          this.saveAuthData(this.token, expiration_date, this.user_id);

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
    this.user_id = '';
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
  private saveAuthData(token: string, expiration_date: Date, user_id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration_date.toISOString());
    localStorage.setItem('user_id', user_id);
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
