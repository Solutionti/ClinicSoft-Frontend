import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  pruebaPdf(): void {
    var doc = new jsPDF({
      format: 'legal',
    });

    doc.setFontSize(12);
    doc.text('REPÚBLICA DE COLOMBIA', 80, 10);
    doc.text('MINISTERIO DE SALUD Y PROTECCIÓN SOCIAL', 60, 15);
    doc.setFontSize(8);

    doc.output('pdfobjectnewwindow', { filename: 'Documento Furips' });
  }
}
