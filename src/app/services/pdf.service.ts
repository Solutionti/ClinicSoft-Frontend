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

  pdfFacturaAdmision() {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfFacturaAdmision`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  pdfFacturaLaboratorio() {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfFacturaLaboratorio`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfColposcopia(){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfColposcopia`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfGastos(){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfGastos`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfLaboratorio(){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfLaboratorio`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfCaja(){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfCaja`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfInventario() {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfInventario`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }

  generarPdfKardex() {
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfKardex`;

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
