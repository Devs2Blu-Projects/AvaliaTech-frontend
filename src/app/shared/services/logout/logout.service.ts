import { UpdateService } from './../update/update.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private _router: Router, private _updateService: UpdateService) { }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login'])
      .then(() => {
        setTimeout(() => { this._updateService.notify('Sessão encerrada com sucesso.') }, 1000);
      });
  }
}
