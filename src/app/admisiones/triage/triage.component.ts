import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { TableModule } from 'primeng/table';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { AdmisionesService } from '../services/admisiones.service';
import { ListasService } from '../../services/listas.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-triage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './triage.component.html'
})
export class TriageComponent implements OnInit {

  constructor(
    private admisionServices: AdmisionesService,
    private listaServices: ListasService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.getAdmissionTriage();
    this.getDoctor();
    this.getSpecialties();
  }

  siguienteTriage = true;

  triageForm: FormGroup = new FormGroup({
    dni_triage: new FormControl({ value: '', disabled: true }),
    paciente_triage: new FormControl({ value: '', disabled: true }),
    edad_triage: new FormControl({ value: '', disabled: true }),
    doctor_triage: new FormControl({ value: '', disabled: true }),
    especialidad_triage: new FormControl({ value: '', disabled: true }),
    presion_triage: new FormControl(0),
    temperatura_triage: new FormControl(0),
    frecuenciar_triage: new FormControl(0),
    frecuenciac_triage: new FormControl(0),
    saturacion_triage: new FormControl(0),
    peso_triage: new FormControl(0),
    talla_triage: new FormControl(0),
    imc_triage: new FormControl(0),
  });

  getTriage: any[] = [];
  getAdmissionTriage() {
    let estado = "Triage";
    this.admisionServices
        .getAdmission(estado)
        .subscribe((response: any ) => {
          this.getTriage = response;
        })
  }
  getDoctors: any[] = []
  getDoctor() {
    this.listaServices
        .getDoctor()
        .subscribe((response: any ) => {
          console.log(response);
          this.getDoctors = response;
        })
  }

  getSpeciality: any[] = [];
  getSpecialties() {
    this.listaServices
        .getSpecialties()
        .subscribe((response: any ) => {
          console.log(response);
          this.getSpeciality = response;
        })
  }

  PasarValoresTriage(paciente: any, doctor: any, especialidad: any ) {
    this.triageForm.patchValue(
      {
        dni_triage: paciente,
        doctor_triage: doctor,
        especialidad_triage: especialidad,
      }
    );
    this.showSuccess("Se ha seleccionado un paciente para toma de triage");
  }

  crearTriage() {

  }

  pasarConsulta() {
    
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
