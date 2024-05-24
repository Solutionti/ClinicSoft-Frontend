import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MenuComponent, CerrarsesionComponent, ReactiveFormsModule],
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent implements OnInit {

  ngOnInit(): void {

  }

  btnHistoriaHidden = false;
  btnActualizarHidden = true;
  btnAgregarHidden = false;
  containerResponsable = true;

  crearPacienteForm: FormGroup = new FormGroup({
    crearpaciente_dni: new FormControl(''),
    crearpaciente_apellido: new FormControl(''),
    crearpaciente_nombre: new FormControl(''),
    crearpaciente_hc: new FormControl(''),
    crearpaciente_celular: new FormControl(''),
    crearpaciente_sexo: new FormControl(''),
    crearpaciente_fechanacimiento: new FormControl(''),
    crearpaciente_edad: new FormControl(''),
    crearpaciente_direccion: new FormControl(''),
    crearpaciente_departamento: new FormControl(''),
    crearpaciente_provincia: new FormControl(''),
    crearpaciente_distrito: new FormControl(''),
    crearpaciente_ocupacion: new FormControl(''),
    crearpaciente_grado: new FormControl(''),
    crearpaciente_estadocivil: new FormControl(''),
    crearpaciente_esmenor: new FormControl(''),
    crearpaciente_documentores: new FormControl(''),
    crearpaciente_responsable: new FormControl(''),
    crearpaciente_telefonores: new FormControl(''),
    crearpaciente_parentescores: new FormControl('')
  });

}
