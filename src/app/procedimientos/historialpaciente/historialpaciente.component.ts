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
import { PdfService } from '../../services/pdf.service';

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

  //
  antecedentes = true;
  anamnesis = true;
  axamen_fisico = true;
  consulta = true;
  plan_trabajo = true;
  diagnostico = true;
  procedimiento  = true;

  constructor(
    private route: ActivatedRoute,
    private procedimientoService: ProcedimientosService,
    private admisioneServices: AdmisionesService,
    private listaServices: ListasService,
    private pdfServices: PdfService
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
    examen_piel: new FormControl(''),
    examen_tiroides: new FormControl(''),
    examen_mamas: new FormControl(''),
    examen_respiratorio: new FormControl(''),
    examen_cardiovascular: new FormControl(''),
    examen_abdomen: new FormControl(''),
    examen_genito: new FormControl(''),
    examen_tacto: new FormControl(''),
    examen_locomotor: new FormControl(''),
    examen_sistema: new FormControl(''),
  });

  planForm: FormGroup = new FormGroup({
    plan_examen: new FormControl(''),
    plan_procedimiento: new FormControl(''),
    plan_interconsulta: new FormControl(''),
    plan_tratamiento: new FormControl(''),
    plan_referencia: new FormControl(''),
    plan_cita: new FormControl(''),
    plan_firma: new FormControl(''),
  });

  anamnesisForm: FormGroup = new FormGroup ({
    anamnesis_directa: new FormControl(''),
    anamnesis_empresa: new FormControl(''),
    anamnesis_compañia: new FormControl(''),
    anamnesis_iafa: new FormControl(''),
    anamnesis_acompañante: new FormControl(''),
    anamnesis_dni: new FormControl(''),
    anamnesis_celular: new FormControl(''),
    anamnesis_consulta: new FormControl(''),
    anamnesis_tratamiento: new FormControl(''),
    anamnesis_enfermedad: new FormControl(''),
    anamnesis_tiempo: new FormControl(''),
    anamnesis_inicio: new FormControl(''),
    anamnesis_curso: new FormControl(''),
    anamnesis_sintomas: new FormControl(''),
  });

  consultaForm: FormGroup = new FormGroup ({
    consulta_motivo: new FormControl(''),
    consulta_sintomas: new FormControl(''),
  });

  historiaTipoForm: FormGroup = new FormGroup ({
    tphistoria: new FormControl({value: '', disabled: false})
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

  habilitarMenu() {
    this.historiaTipoForm.get("tphistoria")?.disable();
    let historia = this.historiaTipoForm.get("tphistoria")?.value;

    if(historia == "1") {
      this.anamnesis = false;
      this.axamen_fisico = false;
      this.plan_trabajo = false;
      this.diagnostico = false;
      this.procedimiento  = false;
    }
    else if(historia == "2") {
      this.antecedentes = false;
      this.consulta = false;
      this.axamen_fisico = false;
      this.diagnostico = false;
      this.procedimiento  = false;
    }
    else if(historia == "") {
      this.antecedentes = true;
      this.anamnesis = true;
      this.axamen_fisico = true;
      this.consulta = true;
      this.plan_trabajo = true;
      this.diagnostico = true;
      this.procedimiento  = true;
    }
  }

  imprimirhistoriaclinica(){
    this.pdfServices
    .pdfHistoriaClinica()
  }
  
}
