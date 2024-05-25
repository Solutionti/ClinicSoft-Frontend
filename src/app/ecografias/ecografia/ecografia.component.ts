import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ecografia',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule
  ],
  templateUrl: './ecografia.component.html'
})
export class EcografiaComponent implements OnInit {

  ngOnInit(): void {

  }

  ecografiaForm = new FormGroup({

    dni_ecografia: new FormControl(''),
    nombre_ecografia: new FormControl(''),
    tipo_ecografia: new FormControl(''),
    fecha_ecografia: new FormControl(''),
    observacion_ecografia: new FormControl(''),
  });
}
