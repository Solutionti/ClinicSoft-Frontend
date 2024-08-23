import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(
    private http: HttpClient
  ) { }

  getSex() {
    return this.http.get(environment.apiClinicSoft + 'getSex');
  }

  getDepartaments() {
    return this.http.get(environment.apiClinicSoft + 'getDepartaments');
  }

  getAcademics() {
    return this.http.get(environment.apiClinicSoft + 'getAcademics');
  }

  getCivilStatus() {
    return this.http.get(environment.apiClinicSoft + 'getCivilStatus');
  }

  getDoctor() {
    return this.http.get(environment.apiClinicSoft + 'getDoctor');
  }

  getSpecialties(){
    return this.http.get(environment.apiClinicSoft + 'getSpecialties');
  }

  getProvince(departamento: any ) {
    let params = new HttpParams().set("departamento", departamento);

    return this.http.get(environment.apiClinicSoft + 'getProvince', { params });
  }

  getDistrict(departamento: any, provincia: any  ) {
    let params = new HttpParams().set("departamento", departamento)
                                 .set("provincia", provincia);

    return this.http.get(environment.apiClinicSoft + 'getDistrict', { params });
  }

  getCategories() {
    return this.http.get(environment.apiClinicSoft + 'getCategories');
  }

  getLaboratoryTable() {
    return this.http.get(environment.apiClinicSoft + 'getLaboratoryTable');
  }

  getDocumentosPdfPacientes(paciente: any ) {
    let params = new HttpParams().set("paciente", paciente);

    return this.http.get(environment.apiClinicSoft + 'getDocumentosPdfPacientes', { params });

  }

  createTransaccion(datos: any ) {
    return this.http.post(environment.apiClinicSoft + 'createTransaccionTraza', {
      transaccion: datos[0].transaccion,
      valor: datos[0].valor,
      usuario: datos[0].usuario,
      tipoingreso: datos[0].tipoingreso,
     });
  }

  getTransaccion() {
    return this.http.get(environment.apiClinicSoft + 'getTransaccion');
  }

  getUsersAll() {
    return this.http.get(environment.apiClinicSoft + 'getUsersAll');
  }


  countEfectivo() {
    return this.http.get(environment.apiClinicSoft + 'countEfectivo');
  }

  countTargeta() {
    return this.http.get(environment.apiClinicSoft + 'countTargeta');
  }

  getDiagnosticos() {
    return this.http.get(environment.apiClinicSoft + 'getDiagnosticos');
  }

  getDocumentosPaciente(paciente: any ) {
    let params = new HttpParams().set("paciente", paciente);

    return this.http.get(environment.apiClinicSoft + 'getDocumentosPaciente', { params });
  }

  contarMesAMes(fechainicial: any, fechafinal: any ) {

    let params =  new HttpParams().set("fechainicial", fechainicial)
                                  .set("fechafinal", fechafinal);
    return this.http.get(environment.apiClinicSoft + 'contarMesAMes', { params });
  }

}
