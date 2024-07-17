import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  createColposcopia(formdata: FormData){
    const url = `${environment.apiClinicSoft}createColposcopia`;
    
    return this.http.post(url,formdata);
  }

  getQuotePatient(documento: any ) {
    const url = `${environment.apiClinicSoft}getQuotePatient`;
    let params = new HttpParams().set("documento", documento);
    return this.http.get(url, { params });
  }

  subirArchivosPdf(formdata: FormData) {
    const url = `${environment.apiClinicSoft}subirArchivosPdf`;

    return this.http.post(url, formdata);
  }
}
