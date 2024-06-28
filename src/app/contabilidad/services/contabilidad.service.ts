import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  constructor(
    private http: HttpClient
  ) { }

  getPayments(){
    const url =  `${environment.apiClinicSoft}getPayments`;

    return this.http.get(url);
  }

  getGasto() {
    const url =  `${environment.apiClinicSoft}getGasto`;

    return this.http.get(url);
  }

  CreateEspeciality(datos: any ) {
    const url =  `${environment.apiClinicSoft}CreateEspeciality`;

    return this.http.post(url, {
      comision_aproximada: datos[0].comision_aproximada,
      estado: datos[0].estado,
      descripcion: datos[0].descripcion,
      costo: datos[0].costo,
      usuario: datos[0].usuario,
    });
  }

  CreateLaboratory(datos: any ) {
    const url =  `${environment.apiClinicSoft}CreateLaboratory`;

    return this.http.post(url, {
      nombre: datos[0].nombre,
      precio: datos[0].precio,
      estado: datos[0].estado,
      usuario: datos[0].usuario,
    });
  }

  
}
