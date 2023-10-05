import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly _url = ""

  constructor(private _http:HttpClient) { }

  // login():Observable<any>{
  //   return this._http.post(this._url)
  // }
}
