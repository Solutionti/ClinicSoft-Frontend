import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private http: HttpClient
  ) { }

  pdfHistoriaClinica() {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfHistoriaClinica`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  pdfFacturaAdmision(admision: any ) {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfFacturaAdmision?admision=` + admision;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  pdfFacturaLaboratorio(codigo: any) {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfFacturaLaboratorio?codigo=` + codigo;
    let params = new HttpParams().set("codigo", codigo);
    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url, { params });
  }

  generarPdfColposcopia(){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfColposcopia`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfGastos(fechainicial: any, fechafinal: any ){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfGastos?fechainicial=` + fechainicial + '&fechafinal=' +fechafinal ;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfLaboratorio(fechainicial: any , fechafinal: any){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfLaboratorio?fechainicial=` + fechainicial + '&fechafinal=' +fechafinal ;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfCaja(doctor: any ,fechainicial: any ,fechafinal: any ){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfCaja?doctor=` + doctor + '&fechainicial=' + fechainicial + '&fechafinal=' + fechafinal;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfInventario(cantidad: any , valor: any ) {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfInventario?cantidad=` + cantidad + '&valor=' + valor;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfKardex(producto: any ,fechainicial: any ,fechafinal: any ) {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfKardex?producto=` + producto + '&fechainicial=' + fechainicial + '&fechafinal=' + fechafinal;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarpdfPagos() {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfPagos`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }
}
