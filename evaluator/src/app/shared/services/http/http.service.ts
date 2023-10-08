import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly _apiUrl: string = '';

  constructor(private _http: HttpClient) { }

  getAll(route: string): Observable<any> { return this._http.get(`${this._apiUrl}/${route}`); }
}