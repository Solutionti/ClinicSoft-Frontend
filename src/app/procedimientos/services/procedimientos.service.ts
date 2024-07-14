import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProcedimientosService {

  constructor(
    private http: HttpClient
  ) { }

  getColposcopias() {
    const url = `${environment.apiClinicSoft}getColposcopias`;

    return this.http.get(url);
  }

  createColposcopia(datos: any){
    const url = `${environment.apiClinicSoft}createColposcopia`;

    return this.http.post(url,{
      paciente: datos[0].paciente,
      fecha: datos[0].fecha,
      medico: datos[0].medico,
      escamo_columnar: datos[0].escamo_columnar,
      endo_cervix: datos[0].endo_cervix,
      perineo: datos[0].perineo,
      region_parianal: datos[0].region_parianal,
      biopsia: datos[0].biopsia,
      papanicolaou: datos[0].papanicolaou,
      conclusiones: datos[0].conclusiones,
      imagen1: "pueba",
      imagen2: "prueba",
      usuario: datos[0].usuario,
      vagina: datos[0].vagina,
      vulva: datos[0].vulva,
      cmp: "123",
    });
  }

  createHistoriaClinica(datos: any){
    const url = `${environment.apiClinicSoft}createHistoriaClinica`;

    return this.http.post(url,{
      anamnesis: datos[0].anamnesis,
      empresa: datos[0].empresa,
      compania: datos[0].compania,
      iafa: datos[0].iafa,
      nombre_acompanante: datos[0].nombre_acompanante,
      dni: datos[0].dni,
      celular: datos[0].celular,
      motivo_consulta: datos[0].motivo_consulta,
      tratamiento_anterior: datos[0].tratamiento_anterior,
      enfermedad_actual: datos[0].enfermedad_actual,
      tiempo: datos[0].tiempo,
      inicio: datos[0].inicio,
      curso: datos[0].curso,
      sintomas: datos[0].sintomas,
      cabeza: datos[0].cabeza,
      cuello: datos[0].cuello,
      ap_respiratoria: datos[0].ap_respiratoria,
      ap_cardio: datos[0].ap_cardio,
      abdomen: datos[0].abdomen,
      ap_genitourinario: datos[0].ap_genitourinario,
      loco_motor: datos[0].loco_motor,
      apetito: datos[0].apetito,
      sed: datos[0].sed,
      orina: datos[0].orina,
      sistema_nervioso: datos[0].sistema_nervioso,
      examen_dx: datos[0].examen_dx,
      procedimientos: datos[0].procedimientos,
      interconsultas: datos[0].interconsultas,
      tratamiento: datos[0].tratamiento,
      plan_trabajo: datos[0].plan_trabajo,
      referencia: datos[0].referencia,
      proxima_cita: datos[0].proxima_cita,
      firma_medico: datos[0].firma_medico,
      usuario: datos[0].usuario,
      familiares1:datos[0].familiares1,
      patologicos1:datos[0].patologicos1,
      gineco_obstetrico1:datos[0].gineco_obstetrico1,
      fum1:datos[0].fum1,
      rm1:datos[0].rm1,
      flujo_genital1:datos[0].flujo_genital1,
      no_de_parejas1:datos[0].no_de_parejas1,
      gestas1:datos[0].gestas1,
      partos11:datos[0].partos11,
      abortos1:datos[0].abortos1,
      anticonceptivos1:datos[0].anticonceptivos1,
      tipo1:datos[0].tipo1,
      tiempo1:datos[0].tiempo1,
      cirugia_ginecologica1:datos[0].cirugia_ginecologica1,
      otros1:datos[0].otros1,
      fecha_pap1:datos[0].fecha_pap1,
      no_hijos1:datos[0].no_hijos1,
      motivo_consulta1:datos[0].motivo_consulta1,
      signossintomas1:datos[0].signossintomas1,
      piel_tscs1:datos[0].piel_tscs1,
      tiroides1:datos[0].tiroides1,
      mamas1:datos[0].mamas1,
      arespiratorio1:datos[0].arespiratorio1,
      acardiovascular1:datos[0].acardiovascular1,
      abdomen1:datos[0].abdomen1,
      genito_urinario1:datos[0].genito_urinario1,
      tacto_rectal1:datos[0].tacto_rectal1,
      locomotor1:datos[0].locomotor1,
      sistema_nervioso1:datos[0].sistema_nervioso1,
      examenes_auxiiliares1:datos[0].examenes_auxiiliares1,
      plan_trabajo1:datos[0].plan_trabajo1,
      tratamiento1:datos[0].tratamiento1,
      proxima_cita1:datos[0].proxima_cita1,
      firma_medico1:datos[0].firma_medico1,
      estado1:datos[0].estado1,
      usuario1:datos[0].usuario1
    });
  }

  getQuotePatient(documento: any ) {
    const url = `${environment.apiClinicSoft}getQuotePatient`;
    let params = new HttpParams().set("documento", documento);
    return this.http.get(url, { params });
  }
}
