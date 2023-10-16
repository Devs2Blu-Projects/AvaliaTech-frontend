import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): boolean | UrlTree {
    const role = this._authService.getUserRole();

    if (role === 'admin' || role === 'group' || role === 'user') return true;
    else {
      this._router.navigate([/*access-denied-route*/]);
      return false;
    }
  }
}
