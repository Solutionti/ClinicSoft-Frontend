import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AdmisionesService } from '../services/admisiones.service';
import { ListasService } from '../../services/listas.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MenuComponent,
    CerrarsesionComponent,
    ReactiveFormsModule,
    TableModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
  providers: [MessageService]
})
export class PacientesComponent implements OnInit {
  date: any;

  constructor(
    private admisionService: AdmisionesService,
    private listaService: ListasService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // this.getpacientesTable();
    this.getSex();
    this.getDepartaments();
    this.getAcademics();
    this.getCivilStatus();
  }

  btnHistoriaHidden = true;
  btnActualizarHidden = true;
  btnAgregarHidden = false;
  containerResponsable = true;
  spinner = true;
  paciente = "";


  crearPacienteForm: FormGroup = new FormGroup({
    crearpaciente_dni: new FormControl('',[Validators.required]),
    crearpaciente_apellido: new FormControl('',[Validators.required]),
    crearpaciente_nombre: new FormControl('',[Validators.required]),
    crearpaciente_hc: new FormControl({value: '', disabled: true},[Validators.required]),
    crearpaciente_celular: new FormControl(''),
    crearpaciente_sexo: new FormControl('',[Validators.required]),
    crearpaciente_fechanacimiento: new FormControl('',[Validators.required]),
    crearpaciente_edad: new FormControl({value: '', disabled:true}),
    crearpaciente_direccion: new FormControl('',[Validators.required]),
    crearpaciente_departamento: new FormControl('',[Validators.required]),
    crearpaciente_provincia: new FormControl('',[Validators.required]),
    crearpaciente_distrito: new FormControl('',[Validators.required]),
    crearpaciente_ocupacion: new FormControl(''),
    crearpaciente_grado: new FormControl('',[Validators.required]),
    crearpaciente_estadocivil: new FormControl('',[Validators.required]),
    crearpaciente_esmenor: new FormControl(''),
    crearpaciente_documentores: new FormControl(''),
    crearpaciente_responsable: new FormControl(''),
    crearpaciente_telefonores: new FormControl(''),
    crearpaciente_parentescores: new FormControl('')
  });

  get dniControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_dni') as FormControl;
  }

  get apellidosControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_apellido') as FormControl;
  }

  get nombresControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_nombre') as FormControl;
  }

  get hcControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_hc') as FormControl;
  }

  get sexoControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_sexo') as FormControl;
  }

  get nacimientoControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_fechanacimiento') as FormControl;
  }

  get direccionControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_direccion') as FormControl;
  }

  get departamentoControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_departamento') as FormControl;
  }

  get provinciaControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_provincia') as FormControl;
  }

  get distritoControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_provincia') as FormControl;
  }

  get academicoControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_grado') as FormControl;
  }

  get civilControl(): FormControl {
    return this.crearPacienteForm.get('crearpaciente_estadocivil') as FormControl;
  }

  consultaPacienteForm = new FormGroup({
    tpdocumento_consulta: new FormControl('DNI'),
    documento_consulta: new FormControl(''),
    apellido_consulta: new FormControl(''),
  });


  calcularEdad(){
    let fecha = this.crearPacienteForm.get("crearpaciente_fechanacimiento")?.value;
    let edadCalculada: number = 0;
    const date: Date = new Date();
    const cumple: Date = new Date('"' + fecha + '"');

    let age: number = date.getFullYear() - cumple.getFullYear();
    const month: number = date.getMonth() - cumple.getMonth();
    if (month < 0 || (month === 0 && date.getDate() < cumple.getDate())) {
      age--;
    }

    edadCalculada = age;
    this.crearPacienteForm.patchValue({
      crearpaciente_edad: edadCalculada
     })


  }

  getSexs: any[] = [];
  getSex() {
    this.listaService
        .getSex()
        .subscribe((response: any ) => {
          this.getSexs = response;
        })
  }

  getDepartament: any[] = [];
  getDepartaments(){
      this.listaService
          .getDepartaments()
          .subscribe((response: any ) => {
            this.getDepartament = response;
        })
  }

  getAcademic: any[] = [];
  getAcademics(){
      this.listaService
          .getAcademics()
          .subscribe((response: any ) => {
            this.getAcademic = response;
      })
  }

  getCivilStatu: any[] = [];
  getCivilStatus() {
      this.listaService
          .getCivilStatus()
          .subscribe((response: any ) => {
            this.getCivilStatu = response;
      })

  }

  getProvinces: any[] = [];
  getProvince() {
    let departamento = this.crearPacienteForm.get("crearpaciente_departamento")?.value; //se recupera valor input
    this.listaService
        .getProvince(departamento)
        .subscribe((response: any ) => {
          this.getProvinces = response;
        })
  }

  getProvince2(departamento: any ) {
    this.listaService
        .getProvince(departamento)
        .subscribe((response: any ) => {
          this.getProvinces = response;
        })
  }

  getDistricto: any[] = [];
  getDistrict(){
    let provincia = this.crearPacienteForm.get("crearpaciente_provincia")?.value,
       departamento = this.crearPacienteForm.get("crearpaciente_departamento")?.value
    this.listaService
        .getDistrict(departamento,provincia)
        .subscribe((response: any ) => {
          this.getDistricto = response;
        })
  }

  getDistrict2(provincia: any , departamento: any ){
    this.listaService
        .getDistrict(departamento,provincia)
        .subscribe((response: any ) => {
          this.getDistricto = response;
        })
  }

  getPacienteApiPeru(): void {
    this.spinner = false;
    let dni = this.crearPacienteForm.get("crearpaciente_dni")?.value;
    this.btnAgregarHidden = false;
    this.btnActualizarHidden = true;
    this.btnHistoriaHidden = true;

    this.admisionService
        .getPacienteApiPeru(dni)
        .subscribe((response: any ) => {
          if(response.success == true) {

            setTimeout(() => {
              this.getProvince();
              
            }, 3000);
            setTimeout(() => {
              this.getDistrict();              
            }, 3000);

            this.crearPacienteForm.patchValue(
              {
                crearpaciente_apellido: response.data.apellido_paterno + ' ' + response.data.apellido_materno,
                crearpaciente_nombre: response.data.nombres,
                crearpaciente_hc: response.data.numero,
                crearpaciente_direccion: response.data.direccion,
                crearpaciente_departamento: response.data.ubigeo[0],
                crearpaciente_provincia: response.data.ubigeo[1],
                crearpaciente_distrito: response.data.ubigeo[2],
              }
            );
            this.showSuccess("Se ha encontrado un paciente");
            this.spinner = true;

            this.crearPacienteForm.patchValue({
              crearpaciente_hc: dni
            });
          }
          else {
            this.showError("No se ha encontrado un paciente asociado al DNI " + dni);
            this.crearPacienteForm.patchValue({
              crearpaciente_hc: dni
            });
            this.spinner = true;
          }

        });
  }

  getPaciente: any [] = [];

  getpacientesTable() {
    this.spinner = false;
    let documento = this.consultaPacienteForm.get("documento_consulta")?.value;
    let apellido = this.consultaPacienteForm.get("apellido_consulta")?.value;
    this.admisionService
        .getpacientesTable(documento, apellido)
        .subscribe((response: any ) => {
          this.getPaciente = response;
          this.spinner = true;
        })
  }

  getPacientesId(documento: any ) {
    this.admisionService
        .getPacientesId(documento)
        .subscribe((response: any ) => {
          this.btnAgregarHidden = true;
          this.btnActualizarHidden = false;
          this.btnHistoriaHidden = false;
          this.paciente = response.data.documento;
          this.getProvince2(response.data.departamento);
          this.getDistrict2(response.data.provincia, response.data.departamento);
          this.crearPacienteForm.patchValue(
            {
               crearpaciente_dni: response.data.documento,
               crearpaciente_apellido: response.data.apellido,
               crearpaciente_nombre: response.data.nombre,
               crearpaciente_hc: response.data.hc,
               crearpaciente_celular: response.data.telefono,
               crearpaciente_sexo: response.data.sexo,
               crearpaciente_fechanacimiento: response.data.fecha_nacimiento,
               crearpaciente_edad: response.data.edad,
               crearpaciente_direccion: response.data.direccion,
               crearpaciente_departamento: response.data.departamento,
               crearpaciente_provincia: response.data.provincia,
               crearpaciente_distrito: response.data.distrito,
               crearpaciente_ocupacion: response.data.ocupacion,
               crearpaciente_grado: response.data.grado_academico,
               crearpaciente_estadocivil: response.data.estado_civil,
               crearpaciente_esmenor: response.data.menor_edad,
               crearpaciente_documentores: response.data.documento,
               crearpaciente_telefonores: response.data.telefono,
            }
           );
        });
  }

  crearPaciente(): void {
    this.spinner = false;
    let dni = this.crearPacienteForm.get("crearpaciente_dni")?.value,
        apellido = this.crearPacienteForm.get("crearpaciente_apellido")?.value,
        nombre = this.crearPacienteForm.get("crearpaciente_nombre")?.value,
        hc = this.crearPacienteForm.get("crearpaciente_hc")?.value,
        celular = this.crearPacienteForm.get("crearpaciente_celular")?.value,
        sexo = this.crearPacienteForm.get("crearpaciente_sexo")?.value,
        fechaNacimiento = this.crearPacienteForm.get("crearpaciente_fechanacimiento")?.value,
        edad = this.crearPacienteForm.get("crearpaciente_edad")?.value,
        direccion = this.crearPacienteForm.get("crearpaciente_direccion")?.value,
        departamento = this.crearPacienteForm.get("crearpaciente_departamento")?.value,
        provincia = this.crearPacienteForm.get("crearpaciente_provincia")?.value,
        distrito = this.crearPacienteForm.get("crearpaciente_distrito")?.value,
        ocupacion = this.crearPacienteForm.get("crearpaciente_ocupacion")?.value,
        grado = this.crearPacienteForm.get("crearpaciente_grado")?.value,
        estadoCivil = this.crearPacienteForm.get("crearpaciente_estadocivil")?.value,
        esMenor = this.crearPacienteForm.get("crearpaciente_esmenor")?.value,
        documentores = this.crearPacienteForm.get("crearpaciente_documentores")?.value,
        responsable = this.crearPacienteForm.get("crearpaciente_responsable")?.value,
        telefonores = this.crearPacienteForm.get("crearpaciente_telefonores")?.value,
        parentescores = this.crearPacienteForm.get("crearpaciente_parentescores")?.value;

    let pacientes: any =  [
      {
        "dni": dni,
        "apellido": apellido,
        "nombre": nombre,
        "hc": hc,
        "celular": celular,
        "sexo": sexo,
        "fechaNacimiento": fechaNacimiento,
        "edad": edad,
        "direccion": direccion,
        "departamento": departamento,
        "provincia": provincia,
        "distrito": distrito,
        "ocupacion": ocupacion,
        "grado": grado,
        "estadoCivil": estadoCivil,
        "esMenor": esMenor,
        "documentores": documentores,
        "responsable": responsable,
        "telefonores": telefonores,
        "parentescores": parentescores,
      }
    ];

    this.admisionService
        .createPatient(pacientes)
        .subscribe((response: any) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            // this.getpacientesTable();
            this.crearPacienteForm.reset();
            this.spinner = true;
          }
          else {
            this.showError(response.message);
            this.spinner = true;
          }
        });
  }

  actualizarPaciente() {
    this.spinner = false;
    let dni = this.crearPacienteForm.get("crearpaciente_dni")?.value,
        apellido = this.crearPacienteForm.get("crearpaciente_apellido")?.value,
        nombre = this.crearPacienteForm.get("crearpaciente_nombre")?.value,
        hc = this.crearPacienteForm.get("crearpaciente_hc")?.value,
        celular = this.crearPacienteForm.get("crearpaciente_celular")?.value,
        sexo = this.crearPacienteForm.get("crearpaciente_sexo")?.value,
        fechaNacimiento = this.crearPacienteForm.get("crearpaciente_fechanacimiento")?.value,
        edad = this.crearPacienteForm.get("crearpaciente_edad")?.value,
        direccion = this.crearPacienteForm.get("crearpaciente_direccion")?.value,
        departamento = this.crearPacienteForm.get("crearpaciente_departamento")?.value,
        provincia = this.crearPacienteForm.get("crearpaciente_provincia")?.value,
        distrito = this.crearPacienteForm.get("crearpaciente_distrito")?.value,
        ocupacion = this.crearPacienteForm.get("crearpaciente_ocupacion")?.value,
        grado = this.crearPacienteForm.get("crearpaciente_grado")?.value,
        estadoCivil = this.crearPacienteForm.get("crearpaciente_estadocivil")?.value,
        esMenor = this.crearPacienteForm.get("crearpaciente_esmenor")?.value,
        documentores = this.crearPacienteForm.get("crearpaciente_documentores")?.value,
        responsable = this.crearPacienteForm.get("crearpaciente_responsable")?.value,
        telefonores = this.crearPacienteForm.get("crearpaciente_telefonores")?.value,
        parentescores = this.crearPacienteForm.get("crearpaciente_parentescores")?.value;

    let pacientes: any =  [
      {
        "dni": dni,
        "apellido": apellido,
        "nombre": nombre,
        "hc": hc,
        "celular": celular,
        "sexo": sexo,
        "fechaNacimiento": fechaNacimiento,
        "edad": edad,
        "direccion": direccion,
        "departamento": departamento,
        "provincia": provincia,
        "distrito": distrito,
        "ocupacion": ocupacion,
        "grado": grado,
        "estadoCivil": estadoCivil,
        "esMenor": esMenor,
        "documentores": documentores,
        "responsable": responsable,
        "telefonores": telefonores,
        "parentescores": parentescores,
      }
    ];

    this.admisionService
        .actualizarPaciente(pacientes)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.getpacientesTable();
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

}
