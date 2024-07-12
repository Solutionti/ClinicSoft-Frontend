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

  getpacientesTable(documento: any ) {
    const url =  `${environment.apiClinicSoft}getPatients`;
    let params = new HttpParams().set("documento", documento);
    return this.http.get(url, { params });
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
  getAdmission(estado: any ) {
    const url = `${environment.apiClinicSoft}getAdmission`;
    let params = new HttpParams().set("estado", estado);
    return this.http.get(url, { params });
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

  // MODULO DE TRIAGE
  getEspecialidadCosto(especialidad: any ) {
    const url = `${environment.apiClinicSoft}getEspecialidadCosto`;
    let params = new HttpParams().set("especialidad", especialidad);
    return this.http.get(url, { params });
  }

  getTriageId (paciente: any ) {
    const url = `${environment.apiClinicSoft}getTriageId`;
    const params = new HttpParams().set("paciente", paciente);
    return this.http.get(url, { params })
  }
  createTriage(datos: any ) {
    const url = `${environment.apiClinicSoft}createTriage`;

    return this.http.post(url, {
      presion_arterial: datos[0].presion_arterial,
      temperatura: datos[0].temperatura,
      frecuencia_respiratoria: datos[0].frecuencia_respiratoria,
      frecuencia_cardiaca: datos[0].frecuencia_cardiaca,
      saturacion: datos[0].saturacion,
      peso: datos[0].peso,
      talla: datos[0].talla,
      imc: datos[0].imc,
      paciente: datos[0].paciente,
      doctor: datos[0].doctor,
      especialidad: datos[0].especialidad,
      estado: datos[0].estado,
      usuario: datos[0].usuario,
    });
  }

  PasateStatusAdmission(estado: any, atencion: any ) {
    const url = `${environment.apiClinicSoft}PasateStatusAdmission`;

    return this.http.post(url, {
      estado: estado,
      atencion: atencion
    });
  }

  // MODULO DE LABORATORIO
  CreateExamenLaboratory(datos: any ) {
    const url = `${environment.apiClinicSoft}CreateExamenLaboratory`;

    return this.http.post(url, {
      dni_paciente: datos[0].dni_paciente,
      medico: datos[0].medico,
      tipo_deposito: datos[0].tipo_deposito,
      descripcion: datos[0].descripcion,
      estado: datos[0].estado,
      fecha: datos[0].fecha,
      hora: datos[0].hora,
      total: datos[0].total,
      usuario: datos[0].usuario,
      analisis: datos[0].analisis,
    });
  }
}
