import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor del Guard
   * @param auth_service Servicio de autenticación
   */
  constructor(private auth_service: AuthService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const is_auth = this.auth_service.getIsAuth();

    if (!is_auth) {
      this.route.navigate(['/login']);
    }

    return is_auth;
  }
}
