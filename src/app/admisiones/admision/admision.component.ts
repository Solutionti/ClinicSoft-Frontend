import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AdmisionesService } from '../services/admisiones.service';
import { ListasService } from '../../services/listas.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admision',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './admision.component.html',
  providers: [MessageService]
})
export class AdmisionComponent implements OnInit {

  constructor(
    private admisionServices: AdmisionesService,
    private listaService: ListasService,
    private messageService: MessageService
  ) { }

  
  ngOnInit(): void {
    this.getSpecialties();
    this.getDoctor();
    this.getAdmission();
  }

  date = new Date();
  fechaActual = String(this.date.getFullYear() + '-' +
    String(this.date.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.date.getDate()).padStart(2, '0')
  );

  admisionForm: FormGroup = new FormGroup({
    dni_admision: new FormControl(''),
    hc_admision: new FormControl({value:'', disabled: true}),
    si_admision: new FormControl(),
    nombre_admision: new FormControl({value:'', disabled: true}),
    especialidad_admision: new FormControl(''),
    doctor_admision: new FormControl(''),
  });

  admisionForm2: FormGroup = new FormGroup({
    fecha_admision: new FormControl({value: this.fechaActual, disabled: true}),
    factura_admision: new FormControl({value:'', disabled: true}),
    costo_admision: new FormControl({value:'', disabled: true}),
    descuento_admision: new FormControl(0),
    comision_admision: new FormControl(0),
    recibida_admision: new FormControl(''),
    devolver_admision: new FormControl({value:'', disabled: true}),
    efectivo_admision: new FormControl('0'),
    total_admision: new FormControl('')
  });

  getSpecialty: any [] = [];
  getSpecialties() {
    this.listaService
        .getSpecialties()
        .subscribe((response: any ) => {
          console.log(response);

          this.getSpecialty = response;
        })
  }

  getDoctors: any[] = [];
  getDoctor() {
    this.listaService
        .getDoctor()
        .subscribe((response: any ) => {
          console.log(response);
          this.getDoctors = response;
        })
  }

  getAdmissions: any[] = [];
  getAdmission() {
    this.admisionServices
        .getAdmission()
        .subscribe((response: any ) => {
          this.getAdmissions = response;
        })
  }

  getPacientesId() {
    let documento = this.admisionForm.get("dni_admision")?.value
    this.admisionForm.controls['hc_admision'].patchValue("");
    this.admisionForm.controls['nombre_admision'].patchValue("");

    this.admisionServices
        .getPacientesId(documento)
        .subscribe((response: any)  => {
          if(response.status == 200) {
            this.admisionForm.patchValue(
              {
                hc_admision: response.data.hc,
                nombre_admision: response.data.nombre  + ' ' + response.apellido
              }
            );
            this.showSuccess("Se ha encontrado el paciente");
          }
          else {
            this.showError(response.message);
          }
            
        })
  }

  createAdmission() {
   
    let datos: any = [
      {
        documento: this.admisionForm.get("dni_admision")?.value, 
        medico: this.admisionForm.get("doctor_admision")?.value,
        especialidad: this.admisionForm.get("especialidad_admision")?.value,
        cola_atencion: "No",
        costo: this.admisionForm2.get("costo_admision")?.value,
        comision: this.admisionForm.get("comision_admision")?.value,
        turno: 0,
        usuario: localStorage.getItem('usuario'),
        orden__: 1,
      }
    ];

    this.admisionServices
        .createAdmission(datos)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.getAdmission();
            this.admisionForm.reset();
            this.admisionForm2.reset();
          }
          else {
            this.showError(response.message);
          }
        });
  }

  getEspecialidadCosto() {
    let especialidad = this.admisionForm.get("especialidad_admision")?.value;
    this.admisionServices
        .getEspecialidadCosto(especialidad)
        .subscribe((response: any ) => {
          this.admisionForm2.controls['costo_admision'].patchValue(response.costo);
          this.admisionForm2.controls['comision_admision'].patchValue(response.comision_aproximada);
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
