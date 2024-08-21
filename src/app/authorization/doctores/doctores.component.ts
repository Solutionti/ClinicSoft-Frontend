import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [
    ToastModule,
    TableModule,
    CerrarsesionComponent,
    MenuComponent,
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './doctores.component.html',
  styleUrl: './doctores.component.css'
})
export class DoctoresComponent {
  constructor(

  ){

  }
  ngOnInit(): void {

  }

  crearForm = new FormGroup({
    crear_documento: new FormControl(''),
    crear_nombre: new FormControl(''),
    crear_perfil: new FormControl(''),
    crear_telefono: new FormControl(''),
    crear_direccion: new FormControl(''),
    crear_correo: new FormControl(''),
    crear_foto: new FormControl('')
  });

  configuracionForm = new FormGroup({
    config_documento: new FormControl(''),
    config_nombre: new FormControl(''),
    config_telefono: new FormControl(''),
    config_direccion: new FormControl(''),
    config_correo: new FormControl(''),
    config_perfil: new FormControl(''),
    config_todos: new FormControl(''),
    config_lunes: new FormControl(''),
    config_martes: new FormControl(''),
    config_miercoles: new FormControl(''),
    config_jueves: new FormControl(''),
    config_viernes: new FormControl(''),
    config_sabado: new FormControl(''),
    config_domingo: new FormControl('')
  });

}
