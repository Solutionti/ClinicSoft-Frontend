import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-ecografiagenetica',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    CerrarsesionComponent,
  ],
  templateUrl: './ecografiagenetica.component.html',
  styleUrl: './ecografiagenetica.component.css'
})
export class EcografiageneticaComponent {

  constructor(){

  }

  ngOnInit(): void {

  }

  geneticaForm = new FormGroup({
    genetica_dni: new FormControl(''),
    genetica_nombre: new FormControl(''),
    genetica_apellido: new FormControl(''),
    genetica_edad: new FormControl(''),
    genetica_hc: new FormControl(''),
    genetica_unico: new FormControl(''),
    genetica_multiple: new FormControl(''),
    genetica_cefalico: new FormControl(''),
    genetica_podatico: new FormControl(''),
    genetica_indiferente: new FormControl(''),
    genetica_liquido: new FormControl(''),
    genetica_placenta: new FormControl(''),
    genetica_lcr: new FormControl(''),
    genetica_lcf: new FormControl(''),
    genetica_punto: new FormControl(''),
    genetica_art_derecha: new FormControl(''),
    genetica_art_izquierdo: new FormControl(''),
    genetica_promedio: new FormControl(''),
    genetica_hueso_nasal: new FormControl(''),
    genetica_translucencia: new FormControl(''),
    genetica_ductus_venosa: new FormControl(''),
    genetica_conclusion: new FormControl(''),
    genetica_sugerencia: new FormControl(''),
  })

}
