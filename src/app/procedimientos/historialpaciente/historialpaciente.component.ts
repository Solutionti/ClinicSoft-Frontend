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
import { ProcedimientosService } from '../services/procedimientos.service';
import { TableModule } from 'primeng/table';
import { Footer } from 'primeng/api';

@Component({
  selector: 'app-historialpaciente',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    CommonModule,
    DialogModule,
    TableModule
  ],
  templateUrl: './historialpaciente.component.html'
})
export class HistorialpacienteComponent implements OnInit {

  paciente: any = "";
  citas = false;
  archivos = false;
  historiaclinica = true;

  constructor(
    private route: ActivatedRoute,
    private procedimientoService: ProcedimientosService,
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
  agendafecha =  "";
  agendahora =  "";
  agendadescripcion =  "";

  antecedentesForm: FormGroup = new FormGroup ({
    antecedentes_familiares: new FormControl(''),
    antecedentes_patologicos: new FormControl(''),
    antecedentes_gineco: new FormControl(''),
    antecedentes_fum: new FormControl(''),
    antecedentes_rm: new FormControl(''),
    antecedentes_flujo: new FormControl(''),
    antecedentes_parejas: new FormControl(''),
    antecedentes_gestas: new FormControl(''),
    antecedentes_partos: new FormControl(''),
    antecedentes_abortos: new FormControl(''),
    antecedentes_anticonceptivos: new FormControl(''),
    antecedentes_tipos: new FormControl(''),
    antecedentes_tiempo: new FormControl(''),
    antecedentes_cirugia: new FormControl(''),
    antecedentes_otros: new FormControl(''),
    antecedentes_fecha: new FormControl(''),
    antecedentes_hijos: new FormControl('')
  });

  examenForm: FormGroup = new FormGroup({
    piel_examen: new FormControl(''),

  });

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
      this.procedimientoService
          .getQuotePatient(this.paciente)
          .subscribe((response: any ) => {
            this.agendafecha =  response.data.fecha;
            this.agendahora =  response.data.hora;
            this.agendadescripcion =  response.data.comentarios;
          });
      // CONSULTAS

  }

}
