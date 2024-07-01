import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(
    private http: HttpClient
  ) { }

  countPatients() {
    const url = `${environment.apiClinicSoft}countPatients`;

    return this.http.get(url);
  }

  countHistory() {
    const url = `${environment.apiClinicSoft}countHistory`;

    return this.http.get(url);
  }

  countPagos() {
    const url = `${environment.apiClinicSoft}countPagos`;

    return this.http.get(url);
  }

  CountDoctors() {
    const url = `${environment.apiClinicSoft}CountDoctors`;

    return this.http.get(url);
  }

  newPatients() {
    const url = `${environment.apiClinicSoft}newPatients`;

    return this.http.get(url);
  }

  getTransacciones() {
    const url = `${environment.apiClinicSoft}getTransacciones`;

    return this.http.get(url);
  }
}
