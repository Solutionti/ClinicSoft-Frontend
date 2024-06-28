import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ListasService } from '../../services/listas.service';
import { AdmisionesService } from '../../admisiones/services/admisiones.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContabilidadService } from '../services/contabilidad.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.css',
  providers: [MessageService]
})

export class FinanzasComponent implements OnInit {

  constructor(
    private listaServices: ListasService,
    private admisionService: AdmisionesService,
    private contabilidadServices: ContabilidadService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getSpecialties();
    this.getLaboratoryTable();
  }

  especialidad = false;
  laboratorio = false;
  spinner = true;
  getSpeciality: any[] = [];
  getLaboratory: any[] = [];

  especialidadForm = new FormGroup({
    especialidad_espec: new FormControl(''),
    precio_espec: new FormControl(''),
    comision_espec: new FormControl(''),
  });

  laboratorioForm = new FormGroup({
    servicio_laboratorio: new FormControl(''),
    precio_laboratorio: new FormControl(''),
    estado_laboratorio: new FormControl(''),
  });

  getSpecialties() {
    this.listaServices
        .getSpecialties()
        .subscribe((response: any ) => {
          this.getSpeciality = response;
        });
  }

  getLaboratoryTable() {
    this.listaServices
        .getLaboratoryTable()
        .subscribe((response: any ) => {
          this.getLaboratory = response;
        });
  }

  CreateEspeciality() {
    this.spinner = false;

    let datos: any = [
      {
        comision_aproximada: this.especialidadForm.get("comision_espec")?.value,
        estado: 'Activa',
        descripcion: this.especialidadForm.get("especialidad_espec")?.value,
        costo: this.especialidadForm.get("precio_espec")?.value,
        usuario: localStorage.getItem('usuario'),
      }
    ];
    this.contabilidadServices
        .CreateEspeciality(datos)
        .subscribe((response: any ) => {
          if(response.status == 200){
            this.showSuccess(response.message);
            this.spinner = true;
            this.getSpecialties();
            this.especialidad = false
          }
          else {
            this.spinner = true;
            this.showError(response.message);
          }
        });
  }

  CreateLaboratory() {
    this.spinner = false;

    let datos: any = [
      {
        nombre: this.laboratorioForm.get("servicio_laboratorio")?.value,
        precio: this.laboratorioForm.get("precio_laboratorio")?.value,
        estado: this.laboratorioForm.get("estado_laboratorio")?.value,
        usuario: localStorage.getItem('usuario'),
      }
    ];
    this.contabilidadServices
        .CreateLaboratory(datos)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.laboratorio = false;
            this.getLaboratoryTable();
            this.spinner = true;
          }
          else {
            this.spinner = true;
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
