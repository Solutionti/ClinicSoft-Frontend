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

  getQuotePatient(documento: any ) {
    const url = `${environment.apiClinicSoft}getQuotePatient`;
    let params = new HttpParams().set("documento", documento);
    return this.http.get(url, { params });
  }
}
