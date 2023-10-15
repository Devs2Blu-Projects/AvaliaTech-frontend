import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly _apiUrl: string = environment.api_url;

  constructor(private _http: HttpClient) { }

  getAll(route: string, options?: any): Observable<any> { return this._http.get(`${this._apiUrl}/${route}`, options); }
  getById(route: string, id: number, options?: any): Observable<any> { return this._http.get(`${this._apiUrl}/${route}/${id}`, options); }

  putById(route: string, id: number, data: object, options?: any): Observable<any> { return this._http.put(`${this._apiUrl}/${route}/${id}`, data, options); }

  post(route: string, data: object, options?: any): Observable<any> { return this._http.post(`${this._apiUrl}/${route}`, data, options); }

  deleteById(route: string, id: number, options?: any): Observable<any> { return this._http.delete(`${this._apiUrl}/${route}/${id}`, options); }
}
