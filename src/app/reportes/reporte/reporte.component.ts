import { PdfService } from './../../services/pdf.service';
import { Component, OnInit } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ListasService } from '../../services/listas.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    CerrarsesionComponent,
    MenuComponent,
    DialogModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './reporte.component.html'
})

export class ReporteComponent implements OnInit {
  
  filtrobusqueda = true;
  date = new Date();
  fechaActual = String(this.date.getFullYear() + '-' +
    String(this.date.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.date.getDate()).padStart(2, '0')
  );

  constructor(
    private PdfServices: PdfService,
    private ListaServices: ListasService
  ){}

  ngOnInit(): void {
    this.getDoctores();
    this.getTransaccion();
    this.countEfectivo();
    this.countTargeta();
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

  getDoctor: any[] = [];
  getDoctores() {
    this.ListaServices
        .getDoctor()
        .subscribe((response: any ) => {
          this.getDoctor = response;
        });
  }

  transaccion: any[] = [];
  getTransaccion() {
    this.ListaServices
        .getTransaccion()
        .subscribe((response: any ) => {
          console.log(response);
          this.transaccion = response;
        });
  }

  efectivo = "";
  countEfectivo() {
    this.ListaServices
        .countEfectivo()
        .subscribe((response: any ) => {
          this.efectivo = response;
        });
  }

  targeta = "";
  countTargeta() {

    this.ListaServices
    .countTargeta()
    .subscribe((response: any ) => {
      this.targeta = response;
    });
  }

}
