import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly _apiUrl: string = '';

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const creds: object = { username, password };

    return this._http.post(`${this._apiUrl}/login`, creds);
  }

  getRole(): string {
    const token = localStorage.getItem('token');

    if (!token) return '';
    else {
      const parts: string[] = token.split('.');

      if (parts.length === 3) {
        const payload: any = JSON.parse(atob(parts[1]));
        const role: string = payload.role;

        return role;
      } else return '';
    }
  }
}
