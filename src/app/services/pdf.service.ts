import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private http: HttpClient
  ) { }

  generarPdfColposcopia(){
    const token: any  = localStorage.getItem("token");
    const newtoken = token.substring(1, token.length - 1);

    const url =  `${environment.apiClinicSoft}pdfColposcopia`;

    window.open(url, "_blank", " width=950, height=1000");
    return this.http.get(url);
  }
}
