import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    const url = `${environment.apiClinicSoft}getUsers`;

    return this.http.get(url);
  }

  registerUser(datos: any ) {
    const url = `${environment.apiClinicSoft}register`;

    return this.http.post(url, {
      usuario: datos[0].usuario,
      ip: datos[0].ip,
      password: datos[0].password,
      email: datos[0].email,
      nombre: datos[0].nombre,
      apellido: datos[0].apellido,
      empresa: datos[0].empresa,
      telefono: datos[0].telefono,
      rol_usuario: datos[0].rol_usuario,
      estado: datos[0].estado,
      usuario_creacion: datos[0].usuario_creacion,
      cmp: datos[0].cmp,
      color: datos[0].cmp,
    })
  }

  iniciarSesion(email: any , password: any ) {
    const url = `${environment.apiClinicSoft}login`;
    return this.http.post(url, {
      email: email,
      password: password
    });
  }

}
