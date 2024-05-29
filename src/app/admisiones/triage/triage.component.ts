import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { TableModule } from 'primeng/table';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { AdmisionesService } from '../services/admisiones.service';
@Component({
  selector: 'app-triage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule
  ],
  templateUrl: './triage.component.html'
})
export class TriageComponent implements OnInit {

  constructor(
    private admisionServices: AdmisionesService
  ) {

  }

  ngOnInit(): void {

  }

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
  getAdmission() {
    let estado = "Registrado";
    this.admisionServices
        .getAdmission(estado)
        .subscribe((response: any ) => {
          this.getTriage = response;
        })
  }



}
