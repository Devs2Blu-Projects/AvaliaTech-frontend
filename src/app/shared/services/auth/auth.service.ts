import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly _apiUrl: string = environment.API_URL;

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const creds: object = { username, password };

    return this._http.post(`${this._apiUrl}/login`, creds, { responseType: 'text' });
  }

  getUserRole(): string {
    const token = localStorage.getItem('token');

    if (token) {
      const parts: string[] = token.split('.');

      if (parts.length === 3) {
        const payload: any = JSON.parse(atob(parts[1]));
        const role: string = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        return role;
      } else return '';
    } else return '';
  }

  getUserId(): number {
    const token = localStorage.getItem('token');

    if (token) {
      const parts: string[] = token.split('.');

      if (parts.length === 3) {
        const payload: any = JSON.parse(atob(parts[1]));
        const id: number = parseInt(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);

        return id;
      } else return 0;
    } else return 0;
  }
}
