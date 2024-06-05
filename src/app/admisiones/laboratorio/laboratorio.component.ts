import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { ListasService } from '../../services/listas.service';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { AdmisionesService } from '../services/admisiones.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    CerrarsesionComponent,
    ReactiveFormsModule,
    TableModule,
    ChipModule,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './laboratorio.component.html'
})
export class LaboratorioComponent implements OnInit {


  constructor(
    private listaServices: ListasService,
    private admisionServices: AdmisionesService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.getLaboratoryTable();
    this.getDoctor();
  }

  date = new Date();
  fechaActual = String(this.date.getFullYear() + '-' +
    String(this.date.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.date.getDate()).padStart(2, '0')
  );

  laboratorioForm = new FormGroup({
    dni_laboratorio: new FormControl({value:'', disabled: false}, [Validators.required]),
    nombre_laboratorio: new FormControl({value:'', disabled: true} , [Validators.required]),
    doctor_laboratorio: new FormControl('' , [Validators.required]),
    fecha_laboratorio: new FormControl({value: this.fechaActual, disabled: true}),
    Efectivo_laboratorio: new FormControl('0', [Validators.required]),
    observacion_laboratorio: new FormControl(''),
    total_laboratorio: new FormControl({value:'', disabled: true}),
  });



  getLaboratories: any[] = [];
  getLaboratoryTable() {
    this.listaServices
        .getLaboratoryTable()
        .subscribe((response: any ) => {
          this.getLaboratories = response;
        })
  }

  getPacientesId() {
    let documento = this.laboratorioForm.get("dni_laboratorio")?.value
    this.laboratorioForm.controls['nombre_laboratorio'].patchValue("");

    this.admisionServices
        .getPacientesId(documento)
        .subscribe((response: any)  => {
          if(response.status == 200) {
            this.laboratorioForm.patchValue(
              {
                nombre_laboratorio: response.data.nombre  + ' ' + response.apellido
              }
            );
            this.showSuccess("Se ha encontrado el paciente");
          }
          else {
            this.showError(response.message);
          }
            
        })
  }

  getDoctors: any[] = [];
  getDoctor() {
    this.listaServices
        .getDoctor()
        .subscribe((response: any ) => {
          console.log(response);
          this.getDoctors = response;
        })
  }

  laboratoryVenta: any [] = [];
  setDataArrayLaboratory(codigo: any, analisis: any, precio: any  ) {
    this.laboratoryVenta.push({
      codigo: codigo,
      analisis: analisis,
      precio: precio 
    });
    this.sumarElementArray();
  }
  
  sumarElementArray() {
    let precioAct: any = 0;
    this.laboratoryVenta.forEach(function(laboratorio: any ) {
      precioAct +=  laboratorio.precio;
    });

    this.laboratorioForm.controls['total_laboratorio'].patchValue(precioAct);
  }

  clickanalisis() {
    alert();
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
