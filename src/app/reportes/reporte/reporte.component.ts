import { PdfService } from './../../services/pdf.service';
import { Component, OnInit } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ListasService } from '../../services/listas.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';
@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    CerrarsesionComponent,
    ReactiveFormsModule,
    MenuComponent,
    DialogModule,
    ButtonModule,
    CommonModule,
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
    this.cargarMesaMes()
  };

  reportesForm = new FormGroup({
    doctor_reportes: new FormControl(''),
    fechainicial_reportes: new FormControl(''),
    fechafinal_reportes: new FormControl(''),
  });

  enero  = "";
  marzo  = "";
  mayo  = "";
  julio  = "";
  septiembre  = "";
  noviembre  = "";

  generarPdfGastos() {
    let fechainicial= this.reportesForm.get("fechainicial_reportes")?.value,
        fechafinal= this.reportesForm.get("fechafinal_reportes")?.value;
    this.PdfServices
        .generarPdfGastos(fechainicial, fechafinal);
  }

  generarPdfLaboratorio() {
    let fechainicial= this.reportesForm.get("fechainicial_reportes")?.value,
        fechafinal= this.reportesForm.get("fechafinal_reportes")?.value;

    this.PdfServices
        .generarPdfLaboratorio(fechainicial, fechafinal);
  }

  generarPdfCaja() {
    let doctor = this.reportesForm.get("doctor_reportes")?.value,
        fechainicial= this.reportesForm.get("fechainicial_reportes")?.value,
        fechafinal= this.reportesForm.get("fechafinal_reportes")?.value;
    this.PdfServices
        .generarPdfCaja(doctor,fechainicial,fechafinal);
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

  contarEneroFebrero() {
    this.ListaServices
        .contarMesAMes("2025-01-01", "2025-01-29")
        .subscribe((response: any ) => {
          this.enero = response;
        });
  }

  contarMarzoAbril() {
    this.ListaServices
        .contarMesAMes("2025-03-01", "2025-04-31")
        .subscribe((response: any ) => {
          this.marzo = response;
        });
  }

  contarMayoJunio() {
    this.ListaServices
        .contarMesAMes("2025-05-01", "2025-06-31")
        .subscribe((response: any ) => {
          this.mayo = response;
        });
  }

  contarJulioAgosto() {
    this.ListaServices
        .contarMesAMes("2025-07-01", "2025-08-31")
        .subscribe((response: any ) => {
          this.julio = response;
        });
  }

  contarSeptiembreOctubre() {
    this.ListaServices
        .contarMesAMes("2025-09-01", "2025-10-31")
        .subscribe((response: any ) => {
          this.septiembre = response;
        });
  }
  contarNoviembreDiciembre() {
    this.ListaServices
        .contarMesAMes("2025-11-01", "2025-12-31")
        .subscribe((response: any ) => {
          this.noviembre = response;
        });
  }

  cargarMesaMes() {
    this.contarEneroFebrero();
    this.contarMarzoAbril();
    this.contarMayoJunio();
    this.contarJulioAgosto();
    this.contarSeptiembreOctubre();
    this.contarNoviembreDiciembre();
  }

}
