import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-ecografiapelvica',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    CerrarsesionComponent,

  ],
  templateUrl: './ecografiapelvica.component.html',
  styleUrl: './ecografiapelvica.component.css'
})
export class EcografiapelvicaComponent {


  pelvicaForm = new FormGroup({
    pelvica_dni: new FormControl(''),
    pelvica_nombre: new FormControl(''),
    pelvica_apellido: new FormControl(''),
    pelvica_edad: new FormControl(''),
    pelvica_hc: new FormControl(''),
    pelvica_utero: new FormControl(''),
    pelvica_regular: new FormControl(''),
    pelvica_modular: new FormControl(''),
    pelvica_endometrio: new FormControl(''),
    pelvica_tumor_si: new FormControl(''),
    pelvica_tumor_no: new FormControl(''),
    pelvica_utero_longitud: new FormControl(''),
    pelvica_utero_transverso: new FormControl(''),
    pelvica_utero_post: new FormControl(''),
    pelvica_regulares_parenquima: new FormControl(''),
    pelvica_ova_der_long: new FormControl(''),
    pelvica_ova_der_transv: new FormControl(''),
    pelvica_ova_der_aspecto: new FormControl(''),
    pelvica_ova_izq_long: new FormControl(''),
    pelvica_ova_izq_transv: new FormControl(''),
    pelvica_ova_izq_aspecto: new FormControl(''),
    pelvica_fondo: new FormControl(''),
    pelvica_conclusion: new FormControl(''),
    pelvica_sugerencias: new FormControl(''),
  })
}
