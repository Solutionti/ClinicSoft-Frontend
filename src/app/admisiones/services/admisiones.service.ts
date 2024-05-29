import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmisionesService {

  constructor(
    private http: HttpClient
  ) { }

  getPacienteApiPeru(dni: number ) {
    const token = "e02a95cc4b8e0d521d447c0786af76cdb424b1a2ba23aed9f7cd9e9bc4712e86";
    const url = "https://my.apidev.pro/api/dni/" + dni + "?api_token=" + token

    return this.http.get(url);
  }

  getpacientesTable() {
    const url =  `${environment.apiClinicSoft}getPatients`;

    return this.http.get(url);
  }

  getPacientesId(documento: any ) {
    let params = new HttpParams().set("documento", documento);
    const url =  `${environment.apiClinicSoft}getPatientId`;

    return this.http.get(url, { params });
  }

  createPatient(pacientes: any) {
    const url =  `${environment.apiClinicSoft}createPatient`;

    return this.http.post(url,
      {
        hc: pacientes[0].hc,
        nombre: pacientes[0].nombre,
        apellido: pacientes[0].apellido,
        documento: pacientes[0].dni,
        email:'prueba@hotmail.com',
        direccion: pacientes[0].direccion,
        telefono: pacientes[0].celular,
        sexo: pacientes[0].sexo,
        fecha_nacimiento: pacientes[0].fechaNacimiento,
        edad: pacientes[0].edad,
        menor_edad: pacientes[0].esMenor,
        familiar_documento: pacientes[0].documentores,
        gruposangunieo:'O+',
        ocupacion: pacientes[0].ocupacion,
        grado_academico: pacientes[0].grado,
        estado_civil: pacientes[0].estadoCivil,
        departamento: pacientes[0].departamento,
        provincia: pacientes[0].provincia,
        distrito: pacientes[0].distrito,
        usuario: localStorage.getItem('usuario'),
      }
    );
  }

  actualizarPaciente(pacientes: any ) {
    const url =  `${environment.apiClinicSoft}updatePatient`;

    return this.http.post(url, {
        hc: pacientes[0].hc,
        nombre: pacientes[0].nombre,
        apellido: pacientes[0].apellido,
        documento: pacientes[0].dni,
        direccion: pacientes[0].direccion,
        telefono: pacientes[0].celular,
        sexo: pacientes[0].sexo,
        fecha_nacimiento: pacientes[0].fechaNacimiento,
        edad: pacientes[0].edad,
        menor_edad: pacientes[0].esMenor,
        familiar_documento: pacientes[0].documentores,
        ocupacion: pacientes[0].ocupacion,
        grado_academico: pacientes[0].grado,
        estado_civil: pacientes[0].estadoCivil,
        departamento: pacientes[0].departamento,
        provincia: pacientes[0].provincia,
        distrito: pacientes[0].distrito,
        usuario: localStorage.getItem('usuario'),
    })
  }

  // MODULO DE ADMISIONES
  getAdmission() {
    const url = `${environment.apiClinicSoft}getAdmission`;

    return this.http.get(url);
  }

  createAdmission(datos: any ) {
    const url = `${environment.apiClinicSoft}createAdmission`;

    return this.http.post(url, {
      documento: datos[0].documento,
      medico: datos[0].medico,
      especialidad: datos[0].especialidad,
      cola_atencion: datos[0].cola_atencion,
      costo: datos[0].costo,
      comision: datos[0].comision,
      turno: datos[0].turno,
      usuario: datos[0].usuario,
      orden__: datos[0].orden__,
    });

  }

  getEspecialidadCosto(especialidad: any ) {
    const url = `${environment.apiClinicSoft}getEspecialidadCosto`;
    let params = new HttpParams().set("especialidad", especialidad);
    return this.http.get(url, { params });
  }
}
