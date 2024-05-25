import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { TableModule } from 'primeng/table';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
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


  ngOnInit(): void {

  }

  triageForm: FormGroup = new FormGroup({
    dni_triage: new FormControl({ value: '', disabled: true }),
    paciente_triage: new FormControl({ value: '', disabled: true }),
    edad_triage: new FormControl({ value: '', disabled: true }),
    doctor_triage: new FormControl({ value: '', disabled: true }),
    especialidad_triage: new FormControl({ value: '', disabled: true }),
    presion_triage: new FormControl(''),
    temperatura_triage: new FormControl(''),
    frecuenciar_triage: new FormControl(''),
    frecuenciac_triage: new FormControl(''),
    saturacion_triage: new FormControl(''),
    peso_triage: new FormControl(''),
    talla_triage: new FormControl(''),
    imc_triage: new FormControl(''),
  });

}
