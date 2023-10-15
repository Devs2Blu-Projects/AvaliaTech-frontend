import { Component, EventEmitter } from '@angular/core';
import { LogoutService } from 'src/app/shared/services/logout/logout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private _logoutService: LogoutService) { }

  logout(): void { this._logoutService.logout(); }
}
