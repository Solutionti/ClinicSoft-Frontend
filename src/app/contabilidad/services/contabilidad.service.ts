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

  createPayment(datos: any ) {
    const url =  `${environment.apiClinicSoft}createPayment`;

    return this.http.post(url, {
      dni_paciente: datos[0].dni_paciente,
      medico: datos[0].medico,
      especialidad: datos[0].especialidad,
      atencion: datos[0].atencion,
      descuento: datos[0].descuento,
      comision: datos[0].comision,
      descripcion: datos[0].descripcion,
      total: datos[0].total,
      cantidad_recibida: datos[0].cantidad_recibida,
      tipo_deposito: datos[0].tipo_deposito,
      estado: datos[0].estado,
      usuario: datos[0].usuario,
    })
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

  createGasto(datos: any) {
    const url =  `${environment.apiClinicSoft}createGasto`;

    return this.http.post(url, {
      tipo_doc: datos[0].tipo_doc,
      nro_doc: datos[0].nro_doc,
      razon_social: datos[0].razon_social,
      descripcion: datos[0].descripcion,
      f_recepcion: datos[0].f_recepcion,
      f_emision: datos[0].f_emision,
      tipo_cpe: datos[0].tipo_cpe,
      serie: datos[0].serie,
      numero: datos[0].numero,
      sub_total: datos[0].sub_total,
      igv: datos[0].igv,
      op_grav: datos[0].op_grav,
      op_inafec: datos[0].op_inafec,
      op_exone: datos[0].op_exone,
      monto: datos[0].monto,
      rpta_sunat: datos[0].rpta_sunat,
      estado: datos[0].estado,
      codigo_usuario: datos[0].codigo_usuario,
      codigo_usuario_sys: datos[0].codigo_usuario_sys

    });
  }


}
