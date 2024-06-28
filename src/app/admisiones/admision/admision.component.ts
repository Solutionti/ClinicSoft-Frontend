import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AdmisionesService } from '../services/admisiones.service';
import { ListasService } from '../../services/listas.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PdfService } from '../../services/pdf.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

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
    ToastModule,
    ConfirmDialogModule,
    ButtonModule
  ],
  templateUrl: './admision.component.html',
  styleUrl: './admision.component.css',
  providers: [ConfirmationService,MessageService]
})
export class AdmisionComponent implements OnInit {

  constructor(
    private admisionServices: AdmisionesService,
    private listaService: ListasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
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
  spinner = true;

  admisionForm: FormGroup = new FormGroup({
    dni_admision: new FormControl(''),
    hc_admision: new FormControl({value:'', disabled: true}),
    si_admision: new FormControl(),
    nombre_admision: new FormControl({value:'', disabled: true}),
    especialidad_admision: new FormControl('', [Validators.required]),
    doctor_admision: new FormControl('',[Validators.required]),
  });

  admisionForm2: FormGroup = new FormGroup({
    fecha_admision: new FormControl({value: this.fechaActual, disabled: true}),
    factura_admision: new FormControl({value:'', disabled: true}),
    costo_admision: new FormControl({value:'', disabled: true}),
    descuento_admision: new FormControl(0),
    comision_admision: new FormControl(0,[Validators.required]),
    recibida_admision: new FormControl('',[Validators.required]),
    devolver_admision: new FormControl({value:'', disabled: true}),
    efectivo_admision: new FormControl('0'),
    total_admision: new FormControl('')
  });

  get especialidadControl(): FormControl {
    return this.admisionForm.get('especialidad_admision') as FormControl;
  }

  get doctorControl(): FormControl {
    return this.admisionForm.get('doctor_admision') as FormControl;
  }

  get comisionControl(): FormControl {
    return this.admisionForm2.get('comision_admision') as FormControl;
  }

  get cantidadControl(): FormControl {
    return this.admisionForm2.get('recibida_admision') as FormControl;
  }

  getSpecialty: any [] = [];
  getSpecialties() {
    this.listaService
        .getSpecialties()
        .subscribe((response: any ) => {
          this.getSpecialty = response;
        })
  }

  getDoctors: any[] = [];
  getDoctor() {
    this.listaService
        .getDoctor()
        .subscribe((response: any ) => {
          this.getDoctors = response;
        })
  }

  getAdmissions: any[] = [];
  getAdmission() {
    let estado = "Registrado";
    this.admisionServices
        .getAdmission(estado)
        .subscribe((response: any ) => {
          this.getAdmissions = response;
        })
  }

  getPacientesId() {
    this.spinner = false;
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
                nombre_admision: response.data.nombre  + ' ' + response.data.apellido
              }
            );
            this.showSuccess("Se ha encontrado el paciente");
            this.spinner = true;
          }
          else {
            this.showError(response.message);
            this.spinner = true;
          }

        })
  }

  createAdmission() {
    this.spinner = false;
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
            this.spinner = true;
          }
          else {
            this.showError(response.message);
            this.spinner = true;
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

  PasateStatusAdmission(documento: any ) {
    let estado = "Triage";
    this.confirmationService.confirm({
      header: 'Estas seguro ?',
      message: 'Desea pasar el paciente a atencion de triage',
      accept: () => {
          this.spinner = false;
          this.admisionServices
              .PasateStatusAdmission(estado, documento)
              .subscribe((response: any ) => {
                if(response.status == 200) {
                  this.showSuccess(response.message);
                  this.getAdmission();
                  this.spinner = true;
                }
                else {
                  this.showError(response.message);
                  this.spinner = true;
                }
              })
        },
        reject: () => {
          // si es incorrecto
        }
    });
  }

  CancelarAdmision(documento: any ) {
    let estado = "Cancelada";
    this.confirmationService.confirm({
      header: 'Estas seguro ?',
      message: 'Desea cancelar la admision del paciente ' + documento,
      accept: () => {
        this.spinner = false;
        this.admisionServices
            .PasateStatusAdmission(estado, documento)
            .subscribe((response: any ) => {
              if(response.status == 200) {
                this.showSuccess(response.message);
                this.getAdmission();
                this.spinner = true;
              }
              else {
                this.showError(response.message);
                this.spinner = true;
              }
            })
      },
      reject: () => {
          // si es incorrecto
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
