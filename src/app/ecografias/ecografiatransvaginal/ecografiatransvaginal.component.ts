import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-ecografiatransvaginal',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    CerrarsesionComponent,
  ],
  templateUrl: './ecografiatransvaginal.component.html',
  styleUrl: './ecografiatransvaginal.component.css'
})
export class EcografiatransvaginalComponent {

  transvaginalForm = new FormGroup({
    transvaginal_dni: new FormControl(''),
    transvaginal_nombre: new FormControl(''),
    transvaginal_apellido: new FormControl(''),
    transvaginal_edad: new FormControl(''),
    transvaginal_hc: new FormControl(''),
    transvaginal_utero: new FormControl(''),
    transvaginal_regular: new FormControl(''),
    transvaginal_modular: new FormControl(''),
    transvaginal_endometrio: new FormControl(''),
    transvaginal_anex_si: new FormControl(''),
    transvaginal_anex_no: new FormControl(''),
    transvaginal_masas_solidas: new FormControl(''),
    transvaginal_ute_long: new FormControl(''),
    transvaginal_ute_transv: new FormControl(''),
    transvaginal_ute_post: new FormControl(''),
    transvaginal_reg_parenquima: new FormControl(''),
    transvaginal_ova_der_long: new FormControl(''),
    transvaginal_ova_der_transv: new FormControl(''),
    transvaginal_ova_der_aspecto: new FormControl(''),
    transvaginal_ova_izq_long: new FormControl(''),
    transvaginal_ova_izq_transv: new FormControl(''),
    transvaginal_ova_izq_aspecto: new FormControl(''),
    transvaginal_fondo: new FormControl(''),
    transvaginal_conclusion: new FormControl(''),
    transvaginal_sugerencias: new FormControl(''),
  })

}
