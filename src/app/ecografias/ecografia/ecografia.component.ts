import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-ecografia',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './ecografia.component.html'
})
export class EcografiaComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

  ecografia1: boolean = false;

  date = new Date();
  fechaActual = String(this.date.getFullYear() + '-' +
    String(this.date.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.date.getDate()).padStart(2, '0')
  );

  ecografiaForm = new FormGroup({
    dni_ecografia: new FormControl(''),
    nombre_ecografia: new FormControl(''),
    tipo_ecografia: new FormControl(''),
    fecha_ecografia: new FormControl({value: this.fechaActual, disabled: true}),
    observacion_ecografia: new FormControl(''),
  });

  

  showmodal1() {
    this.ecografia1 = true;
  }
}
