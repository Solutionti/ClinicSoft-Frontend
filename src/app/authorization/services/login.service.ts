import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  constructor(
    private http: HttpClient
  ) { }

  iniciarSesion(email: any , password: any ) {
    const url = `${environment.apiClinicSoft}login`;
    return this.http.post(url, {
      email: email,
      password: password
    });
  }

}
