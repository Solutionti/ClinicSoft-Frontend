import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    dni_triage: new FormControl({ value: '', disabled: true }, [Validators.required]),
    paciente_triage: new FormControl({ value: '', disabled: true }, [Validators.required]),
    edad_triage: new FormControl({ value: '', disabled: true }),
    doctor_triage: new FormControl({ value: '', disabled: true }, [Validators.required]),
    especialidad_triage: new FormControl({ value: '', disabled: true }, [Validators.required]),
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

  PasarValoresTriage(paciente: any, nombre: any , doctor: any, especialidad: any ) {
    this.triageForm.patchValue(
      {
        dni_triage: paciente,
        paciente_triage: nombre,
        doctor_triage: doctor,
        especialidad_triage: especialidad,
      }
    );
    this.showSuccess("Se ha seleccionado un paciente para toma de triage");
  }

  createTriage() {
    let triage = [
      {
        presion_arterial: this.triageForm.get("presion_triage")?.value,
        temperatura: this.triageForm.get("temperatura_triage")?.value,
        frecuencia_respiratoria: this.triageForm.get("frecuenciar_triage")?.value,
        frecuencia_cardiaca: this.triageForm.get("frecuenciac_triage")?.value,
        saturacion: this.triageForm.get("saturacion_triage")?.value,
        peso: this.triageForm.get("peso_triage")?.value,
        talla: this.triageForm.get("talla_triage")?.value,
        imc: this.triageForm.get("imc_triage")?.value,
        paciente: this.triageForm.get("dni_triage")?.value,
        doctor: this.triageForm.get("doctor_triage")?.value,
        especialidad: this.triageForm.get("especialidad_triage")?.value,
        estado: "Activo",
        usuario: localStorage.getItem("usuario"),
      }
    ];
    this.admisionServices
        .createTriage(triage)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.siguienteTriage = false;
            this.showSuccess(response.message);
          }
          else {
            this.showError(response.message);
          }
        });
  }

  PasateStatusAdmission() {
    let estado = "Consulta",
        atencion = this.triageForm.get("dni_triage")?.value;
    this.admisionServices
        .PasateStatusAdmission(estado, atencion)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.triageForm.reset();
            this.getAdmissionTriage();
            this.siguienteTriage = true;
            this.showSuccess(response.message);
          }
          else {
            this.showError(response.message); 
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
