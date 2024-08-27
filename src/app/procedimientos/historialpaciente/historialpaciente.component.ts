import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Footer, MessageService } from 'primeng/api';
import { PdfService } from '../../services/pdf.service';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { ThisReceiver } from '@angular/compiler';

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
    TableModule,
    ToastModule,
    ChipModule,
  ],
  providers: [MessageService],
  templateUrl: './historialpaciente.component.html',
  styleUrl: './historialpaciente.component.css',
})
export class HistorialpacienteComponent implements OnInit {

  paciente: any = "";
  citas = false;
  archivos = false;
  historiaclinica = true;
  spinner = true;
  //
  antecedentes = true;
  anamnesis = true;
  axamen_fisico = true;
  axamen_fisico2 = true;
  consulta = true;
  plan_trabajo = true;
  diagnostico = true;
  procedimiento  = true;

  constructor(
    private route: ActivatedRoute,
    private procedimientoService: ProcedimientosService,
    private admisioneServices: AdmisionesService,
    private listaServices: ListasService,
    private messageService: MessageService,
    private pdfServices: PdfService
  ) { }

  ngOnInit(): void {
   this.paciente = this.route.snapshot.paramMap.get("documento");
   this.getAlergias();
   this.getAlergiasOtras();
   this.getDataHistoriaCLinica();
   this.getDiagnosticos();
   this.getProcedimientos();
   this.getDocumentosPaciente();
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
    anamnesis_directa: new FormControl('D'),
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
    tphistoria: new FormControl({value: '', disabled: false}),
    consecutivo_historia: new FormControl({value: '', disabled: false}, [Validators.required]),
  });

  cargueDocumentosForm: FormGroup = new FormGroup ({
    tparchivo: new FormControl(''),
    titulo: new FormControl(''),
  });

  fisicoForm: FormGroup = new FormGroup ({
    fisico_piel: new FormControl(''),
    fisico_cuello: new FormControl(''),
    fisico_respiratorio: new FormControl(''),
    fisico_cardio: new FormControl(''),
    fisico_abdomen: new FormControl(''),
    fisico_cabeza: new FormControl(''),
    fisico_locomotor: new FormControl(''),
    fisico_sistema: new FormControl(''),
    fisico_apetito: new FormControl(''),
    fisico_sed: new FormControl(''),
    fisico_orina: new FormControl(''),
  });

  alergiasForm = new FormGroup ({
    tpalergia: new FormControl('', [Validators.required]),
    descripcion_alergia: new FormControl('', [Validators.required]),
  });

  medicamentosForm = new FormGroup ({
    fecha_medicamento: new FormControl(''),
    doctor_medicamento: new FormControl(''),
    paciente_medicamento: new FormControl(''),
    medicamento_medicamento: new FormControl(''),
    cantidad_medicamento: new FormControl(''),
    dosis_medicamento: new FormControl(''),
    via_aplicacion_medicamento: new FormControl(''),
    frecuencia_medicamento: new FormControl(''),
    duracion_medicamento: new FormControl(''),
  });

  alergiaMedicamentos: any[] = [];
  getAlergias() {
    this.procedimientoService
        .getAlergias(this.paciente)
        .subscribe((response: any ) => {
          this.alergiaMedicamentos = response;
        })
  }

  alergiaOtras: any[] = [];
  getAlergiasOtras() {
    this.procedimientoService
        .getAlergiasOtras(this.paciente)
        .subscribe((response: any ) => {
          this.alergiaOtras = response;
        })
  }

  createHistoriaClinica(): void {
    this.spinner = false;

    let pacientes: any = [
      {
        codigo_historia: this.historiaTipoForm.get("consecutivo_historia")?.value,
        tphistoria: this.historiaTipoForm.get("tphistoria")?.value,
        anamnesis: this.anamnesisForm.get("anamnesis_directa")?.value,
        empresa: this.anamnesisForm.get("anamnesis_empresa")?.value,
        compania: this.anamnesisForm.get("anamnesis_compañia")?.value,
        iafa: this.anamnesisForm.get("anamnesis_iafa")?.value,
        nombre_acompanante: this.anamnesisForm.get("anamnesis_acompañante")?.value,
        dni: this.paciente,
        celular: this.anamnesisForm.get("anamnesis_celular")?.value,
        motivo_consulta: this.anamnesisForm.get("anamnesis_consulta")?.value,
        tratamiento_anterior: this.anamnesisForm.get("anamnesis_tratamiento")?.value,
        enfermedad_actual: this.anamnesisForm.get("anamnesis_enfermedad")?.value,
        tiempo: this.anamnesisForm.get("anamnesis_tiempo")?.value,
        inicio: this.anamnesisForm.get("anamnesis_inicio")?.value,
        curso: this.anamnesisForm.get("anamnesis_curso")?.value,
        sintomas: this.anamnesisForm.get("anamnesis_sintomas")?.value,
        piel: this.fisicoForm.get("fisico_piel")?.value,
        cuello: this.fisicoForm.get("fisico_cuello")?.value,
        ap_respiratoria: this.fisicoForm.get("fisico_respiratorio")?.value,
        ap_cardio: this.fisicoForm.get("fisico_cardio")?.value,
        abdomen: this.fisicoForm.get("fisico_abdomen")?.value,
        cabeza: this.fisicoForm.get("fisico_cabeza")?.value,
        ap_genitourinario: "",
        loco_motor: this.fisicoForm.get("fisico_locomotor")?.value,
        sistema_nervioso: this.fisicoForm.get("fisico_sistema")?.value,
        apetito: this.fisicoForm.get("fisico_apetito")?.value,
        sed: this.fisicoForm.get("fisico_sed")?.value,
        orina: this.fisicoForm.get("fisico_orina")?.value,
        examen_dx: this.planForm.get("plan_examen")?.value,
        procedimientos: this.planForm.get("plan_procedimiento")?.value,
        interconsultas: this.planForm.get("plan_interconsulta")?.value,
        tratamiento: this.planForm.get("plan_tratamiento")?.value,
        plan_trabajo: "",
        referencia: this.planForm.get("plan_referencia")?.value,
        proxima_cita: this.planForm.get("plan_cita")?.value,
        firma_medico: this.planForm.get("plan_firma")?.value,
        usuario: localStorage.getItem("usuario"),
        //
        familiares1: this.antecedentesForm.get("antecedentes_familiares")?.value,
        patologicos1: this.antecedentesForm.get("antecedentes_patologicos")?.value,
        gineco_obstetrico1: this.antecedentesForm.get("antecedentes_gineco")?.value,
        fum1: this.antecedentesForm.get("antecedentes_fum")?.value,
        rm1: this.antecedentesForm.get("antecedentes_rm")?.value,
        flujo_genital1: this.antecedentesForm.get("antecedentes_flujo")?.value,
        no_de_parejas1: this.antecedentesForm.get("antecedentes_parejas")?.value,
        gestas1: this.antecedentesForm.get("antecedentes_gestas")?.value,
        partos1: this.antecedentesForm.get("antecedentes_partos")?.value,
        abortos1: this.antecedentesForm.get("antecedentes_abortos")?.value,
        anticonceptivos1: this.antecedentesForm.get("antecedentes_anticonceptivos")?.value,
        tipo1: this.antecedentesForm.get("antecedentes_tipos")?.value,
        tiempo1: this.antecedentesForm.get("antecedentes_tiempo")?.value,
        cirugia_ginecologica1: this.antecedentesForm.get("antecedentes_cirugia")?.value,
        otros1: this.antecedentesForm.get("antecedentes_otros")?.value,
        fecha_pap1: this.antecedentesForm.get("antecedentes_fecha")?.value,
        no_hijos1: this.antecedentesForm.get("antecedentes_hijos")?.value,
        motivo_consulta1: this.consultaForm.get("consulta_motivo")?.value,
        signossintomas1: this.consultaForm.get("consulta_sintomas")?.value,
        piel_tscs1: this.examenForm.get("examen_piel")?.value,
        tiroides1: this.examenForm.get("examen_tiroides")?.value,
        mamas1: this.examenForm.get("examen_mamas")?.value,
        arespiratorio1: this.examenForm.get("examen_respiratorio")?.value,
        acardiovascular1: this.examenForm.get("examen_cardiovascular")?.value,
        abdomen1: this.examenForm.get("examen_abdomen")?.value,
        genito_urinario1: this.examenForm.get("examen_genito")?.value,
        tacto_rectal1: this.examenForm.get("examen_tacto")?.value,
        locomotor1: this.examenForm.get("examen_locomotor")?.value,
        sistema_nervioso1: this.examenForm.get("examen_sistema")?.value,
        examenes_auxiiliares1: "",
        plan_trabajo1: "",
        tratamiento1: "",
        proxima_cita1: "",
        firma_medico1: "",
        estado1: "Activo",
        usuario1: localStorage.getItem("usuario"),
        procedimientosarray: this.procedimientoRelacionado,
        diagnosticosarray: this.diagnosticoRelacionado
          }
        ];

        this.procedimientoService
            .createHistoriaClinica(pacientes)
            .subscribe((response: any ) => {
              if(response.status == 200) {
                this.showSuccess(response.message);
                this.spinner = true;

                this.getProcedimientos2();
                this.getDiagnosticos2();
              }
              else {
                this.showError(response.message);
                this.spinner = true;
              }
            });

  };

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
      this.axamen_fisico2 = false;
      this.plan_trabajo = false;
      this.diagnostico = false;
      this.procedimiento  = false;

      this.procedimientoService
          .getcountCantidadHistorias(1, this.paciente)
          .subscribe((response: any ) => {
            this.historiaTipoForm.patchValue({
              consecutivo_historia: response
            });
          })
    }
    else if(historia == "2") {
      this.antecedentes = false;
      this.consulta = false;
      this.axamen_fisico = false;
      this.diagnostico = false;
      this.procedimiento  = false;

      this.procedimientoService
          .getcountCantidadHistorias(2, this.paciente)
          .subscribe((response: any ) => {
            this.historiaTipoForm.patchValue({
              consecutivo_historia: response
            });
          })
    }
    else if(historia == "") {
      this.antecedentes = true;
      this.anamnesis = true;
      this.axamen_fisico = true;
      this.axamen_fisico2 = true;
      this.consulta = true;
      this.plan_trabajo = true;
      this.diagnostico = true;
      this.procedimiento  = true;

      this.historiaTipoForm.patchValue({
        consecutivo_historia: ""
      });
    }
  }


  imprimirhistoriaclinica(){
    this.spinner = false;

    this.pdfServices
    .pdfHistoriaClinica();
    this.spinner = true;

  }

  archivopdf: any = [];

  cargueDocumento(e: any ) {
    const target = e.target as HTMLInputElement;
    const archivo = e.target.files[0];
    this.archivopdf.push(archivo);
  }

  subirArchivosPdf() {
    this.spinner = false;
    let tparchivo = this.cargueDocumentosForm.get("tparchivo")?.value,
        titulo = this.cargueDocumentosForm.get("titulo")?.value,
        usuario: any  = localStorage.getItem("usuario");

    const formdata = new FormData();

    this.archivopdf.forEach((element: any) => {
      formdata.append('pdfs', this.archivopdf[0]);
    });
      formdata.append('paciente', this.paciente);
      formdata.append('tparchivo', tparchivo);
      formdata.append('titulo', titulo);
      formdata.append('usuario', usuario);

      this.procedimientoService
          .subirArchivosPdf(formdata)
          .subscribe((response: any ) => {
            if(response.status == 200) {
              this.showSuccess(response.message);
              this.listaServices
                  .getDocumentosPdfPacientes(this.paciente)
                  .subscribe((response: any ) => {
                    this.archivospdf = response;
              });
              this.spinner = true;
            }
            else {
              this.showError(response.message);
              this.spinner = true;
            }
          });
  }

  showError(message: string) {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'ClinicSoft Aviso',
        detail: message
      }
    );
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'ClinicSoft Aviso',
      detail: message
    });
  }

  getDiagnostico: any[] = [];
  getDiagnosticos(){
    this.listaServices
        .getDiagnosticos()
        .subscribe((response: any ) =>{
          this.getDiagnostico = response;
        })

  }

  getProcedimiento: any[] = [];
  getProcedimientos() {
    this.listaServices
    .getProcedimientos()
    .subscribe((response: any ) =>{
      this.getProcedimiento = response;
    })
  }

  getDocumentosPacient: any[] = [];
  getDocumentosPaciente(){
    let paciente = this.paciente;
    this.listaServices
        .getDocumentosPaciente(paciente)
        .subscribe((response: any ) => {
          this.getDocumentosPacient = response;
        })

  }

  diagnosticoRelacionado: any[] = [];
  vincularDiagnosticosHistoria(codigo: any, descripcion: any ) {
    this.diagnosticoRelacionado.push(
      {
        historia: this.historiaTipoForm.get("consecutivo_historia")?.value,
        paciente: this.paciente,
        codigodiagnostico: codigo,
        nombrediagnostico: descripcion,
        tpespecialidad: this.historiaTipoForm.get("tphistoria")?.value,
        fecha: '',
        usuario: localStorage.getItem('usuario')
      }
    );

    for(let i = 0; i < this.getDiagnostico.length; i++){
      if(this.getDiagnostico[i].clave === codigo){
        this.getDiagnostico.splice(i, 1);
      }
    }
    
    this.showSuccess("Se ha agregado un Item ");
  }

  dbclickDiagnostico(codigo: any, descripcion: any ) {
    for(let i = 0; i < this.diagnosticoRelacionado.length; i++){
      if(this.diagnosticoRelacionado[i].codigodiagnostico === codigo){
        this.diagnosticoRelacionado.splice(i, 1);
      }
    }
    this.showSuccess("Se ha quitado el diagnostico de la lista");

    this.getDiagnostico.unshift({
      clave: codigo,
      descripcion: descripcion,
    });
  }

  procedimientoRelacionado: any[] = [];
  vincularProcedimientosHistoria(codigo: any, descripcion: any ) {
    this.procedimientoRelacionado.push(
      {
        historia: this.historiaTipoForm.get("consecutivo_historia")?.value,
        paciente: this.paciente,
        codprocedimiento: codigo,
        nomprocedimiento: descripcion,
        especialidad: this.historiaTipoForm.get("tphistoria")?.value,
        fecha: "",
        usuario: localStorage.getItem('usuario')
      }
    );

    for(let i = 0; i < this.getProcedimiento.length; i++){
      if(this.getProcedimiento[i].codigo_cpt === codigo){
        this.getProcedimiento.splice(i, 1);
      }
    }
    console.log(this.procedimientoRelacionado);
    this.showSuccess("Se ha agregado un Item ");
  }

  dbclickProcedimiento(codigo: any, descripcion: any ) {
    for(let i = 0; i < this.procedimientoRelacionado.length; i++){
      if(this.procedimientoRelacionado[i].codprocedimiento === codigo){
        this.procedimientoRelacionado.splice(i, 1);
      }
    }
    this.showSuccess("Se ha quitado el procedimiento de la lista");

    this.getProcedimiento.unshift({
      codigo_cpt: codigo,
      nombre: descripcion,
    });
  }

  createAlergias() {
    this.spinner = false;
    let paciente = this.paciente,
        tpalergia = this.alergiasForm.get("tpalergia")?.value,
        descripcion = this.alergiasForm.get("descripcion_alergia")?.value;

    this.procedimientoService
        .createAlergias(paciente, tpalergia, descripcion)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.getAlergias();
            this.getAlergiasOtras();
            this.showSuccess(response.message);
            this.spinner = true;
          }
          else {
            this.showError(response.message);
            this.spinner = true;
          }
        });
  }

  crearMedicamentos() {
    this.spinner = false;
    let datos = [{
      codigo_historia: this.historiaTipoForm.get("consecutivo_historia")?.value,
      paciente: this.paciente,
      medicamento: this.medicamentosForm.get("medicamento_medicamento")?.value?.split("-")[0],
      codigo_medicamento: this.medicamentosForm.get("medicamento_medicamento")?.value?.split("-")[1],
      cantidad: this.medicamentosForm.get("cantidad_medicamento")?.value,
      dosis: this.medicamentosForm.get("dosis_medicamento")?.value,
      via_aplicacion: this.medicamentosForm.get("via_aplicacion_medicamento")?.value,
      frecuencia: this.medicamentosForm.get("frecuencia_medicamento")?.value,
      duracion: this.medicamentosForm.get("duracion_medicamento")?.value,
      autorizo: localStorage.getItem('usuario'),
      usuario: localStorage.getItem('usuario')
    }];
    this.procedimientoService
        .crearMedicamentos(datos)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.medicamentosForm.patchValue({
              medicamento_medicamento: "",
              cantidad_medicamento: "",
              dosis_medicamento: "",
              via_aplicacion_medicamento: "",
              frecuencia_medicamento: "",
              duracion_medicamento: "",
            });
            this.getMedicamentos();
            this.spinner = true;
          }
          else {
            this.showError(response.message);
            this.spinner = true;
          }
        });
  }

  getMedicamento: any[] = [];
  getMedicamentos() {

    let historia = this.historiaTipoForm.get("consecutivo_historia")?.value,
        paciente = this.paciente;
    this.procedimientoService
        .getMedicamentos(paciente, historia)
        .subscribe((response: any ) => {
          this.getMedicamento = response;
        })
  }

  getprocedimiento: any[] = [];
  getProcedimientos2() {

    let historia = this.historiaTipoForm.get("consecutivo_historia")?.value,
        paciente = this.paciente;

        this.procedimientoService
            .getProcedimientos(paciente, historia)
            .subscribe((response: any ) => {
              this.getprocedimiento = response;
            });
  }

  getdiagnostico: any[] = [];
  getDiagnosticos2() {
    let historia = this.historiaTipoForm.get("consecutivo_historia")?.value,
    paciente = this.paciente;

    this.procedimientoService
        .getDiagnosticos(paciente, historia)
        .subscribe((response: any ) => {
          this.getdiagnostico = response;
        });
  }

}
