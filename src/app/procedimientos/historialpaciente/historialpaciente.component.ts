import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../../componentes/componentes.module';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AdmisionesService } from '../../admisiones/services/admisiones.service';
import { ListasService } from '../../services/listas.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-historialpaciente',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,MenuComponent,CerrarsesionComponent, CommonModule,DialogModule],
  templateUrl: './historialpaciente.component.html'
})
export class HistorialpacienteComponent implements OnInit {

  paciente: any = "";
  citas = false;
  archivos = false;

  constructor(
    private route: ActivatedRoute,
    private admisioneServices: AdmisionesService,
    private listaServices: ListasService
  ) { }

  ngOnInit(): void {
   this.paciente = this.route.snapshot.paramMap.get("documento");

   this.getDataHistoriaCLinica();
  }

  nombrepaciente: any = "";
  fechanacimiento: any = "";

  // TRIAGE
  estatura: any = "";
  peso: any = "";
  masa_corporal: any = "";
  temperatura: any = "";
  frecuencia_respiratoria: any = "";
  frecuencia_cardiaca: any = "";
  porcentaje_grasa: any = "";
  archivospdf: any[] = [];

  getDataHistoriaCLinica() {
    // DATOS DEL PACIENTE
    this.admisioneServices
    .getPacientesId(this.paciente)
    .subscribe((response: any ) => {
      this.nombrepaciente = response.data.nombre + ' ' + response.data.apellido;
      this.fechanacimiento = response.data.fecha_nacimiento;
      });
      
      // TRIAGE DEL PACIENTE
      this.admisioneServices
          .getTriageId(this.paciente)
          .subscribe((response: any ) => {
            this.estatura = response[0].talla;
            this.peso = response[0].peso;
            this.masa_corporal = response[0].imc;
            this.temperatura = response[0].temperatura;
            this.frecuencia_respiratoria = response[0].frecuencia_respiratoria;
            this.frecuencia_cardiaca = response[0].frecuencia_cardiaca;
            this.porcentaje_grasa = "0";
          });

      // DOCUMENTOS PACIENTES
      this.listaServices
          .getDocumentosPdfPacientes(this.paciente)
          .subscribe((response: any ) => {
            this.archivospdf = response;
          });
      
      // CITAS
      // CONSULTAS
         
  }

}
