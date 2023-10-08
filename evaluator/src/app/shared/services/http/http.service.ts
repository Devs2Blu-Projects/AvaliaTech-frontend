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

  putById(route: string, id: number, data: object): Observable<any> { return this._http.put(`${this._apiUrl}/${route}/${id}`, data); }

  post(route: string, data: object): Observable<any> { return this._http.post(`${this._apiUrl}/${route}`, data); }
}
