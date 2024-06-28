import { PdfService } from './../../services/pdf.service';
import { Component, OnInit } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CerrarsesionComponent, MenuComponent, DialogModule, ButtonModule],
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit {
  visible = true;

  constructor(
    private PdfServices: PdfService,
  ){}

  ngOnInit(): void {

  };



  generarPdfGastos() {
    this.PdfServices
        .generarPdfGastos();
  }

  generarPdfLaboratorio() {
    this.PdfServices
        .generarPdfLaboratorio();
  }

  generarPdfCaja() {
    this.PdfServices
        .generarPdfCaja();
  }
}
