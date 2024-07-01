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
import { PdfService } from '../../services/pdf.service';

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
  templateUrl: './laboratorio.component.html',
  styleUrl: './laboratorio.component.css',
})
export class LaboratorioComponent implements OnInit {


  constructor(
    private listaServices: ListasService,
    private admisionServices: AdmisionesService,
    private messageService: MessageService,
    private pdfServices: PdfService
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
  spinner = true;
  pdflaboratorio = true;
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
    this.spinner = false;
    let documento = this.laboratorioForm.get("dni_laboratorio")?.value
    this.laboratorioForm.controls['nombre_laboratorio'].patchValue("");

    this.admisionServices
        .getPacientesId(documento)
        .subscribe((response: any)  => {
          if(response.status == 200) {
            this.laboratorioForm.patchValue(
              {
                nombre_laboratorio: response.data.nombre  + ' ' + response.data.apellido
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

  getDoctors: any[] = [];
  getDoctor() {
    this.listaServices
        .getDoctor()
        .subscribe((response: any ) => {
          console.log(response);
          this.getDoctors = response;
        })
  }

  laboratoryVenta: any[] = [];
  setDataArrayLaboratory(codigo: any, analisis: any, precio: any  ): any  {
    
    this.laboratoryVenta.push({
      codigo: codigo,
      analisis: analisis,
      precio: precio 
    });
    
    for(let i = 0; i < this.getLaboratories.length; i++){
      if(this.getLaboratories[i].codigo === codigo){
        this.getLaboratories.splice(i, 1);
      }
    }
    this.sumarElementArray();
    this.showSuccess("Se ha agregado un Item ");
  }
  
  sumarElementArray() {
    let precioAct: any = 0;
    this.laboratoryVenta.forEach(function(laboratorio: any ) {
      precioAct +=  laboratorio.precio;
    });

    this.laboratorioForm.controls['total_laboratorio'].patchValue(precioAct);
  }

  clickanalisis(codigo: any, nombre: any, precio: any  ) {
    for(let i = 0; i < this.laboratoryVenta.length; i++){
      if(this.laboratoryVenta[i].codigo === codigo){
        this.laboratoryVenta.splice(i, 1);
      }
    }
    this.sumarElementArray();
    this.showSuccess("Se ha quitado el laboratorio de la lista");

    this.getLaboratories.unshift({
      codigo: codigo,
      nombre: nombre,
      precio: precio 
    });
  }

  CreateExamenLaboratory() {
    this.spinner = false;
    let datos: any  = [
      {
        dni_paciente: this.laboratorioForm.get("dni_laboratorio")?.value,
        medico: this.laboratorioForm.get("doctor_laboratorio")?.value,
        tipo_deposito: this.laboratorioForm.get("Efectivo_laboratorio")?.value,
        descripcion: this.laboratorioForm.get("observacion_laboratorio")?.value,
        estado: "Pago",
        fecha: this.laboratorioForm.get("fecha_laboratorio")?.value,
        hora: this.laboratorioForm.get("00:00")?.value,
        total: this.laboratorioForm.get("total_laboratorio")?.value,
        usuario: localStorage.getItem('usuario'),
        analisis: this.laboratoryVenta
      }
    ]
    this.admisionServices
        .CreateExamenLaboratory(datos)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.spinner = true;
            this.pdflaboratorio = false;
          }
          else {
            this.showError(response.message);
            this.spinner = true;
            this.pdflaboratorio = true;
          }
        })
  }

  pdfFacturaLaboratorio() {
    this.pdfServices
        .pdfFacturaLaboratorio();

    setTimeout(() => {
      location.reload();
    }, 3000);
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
