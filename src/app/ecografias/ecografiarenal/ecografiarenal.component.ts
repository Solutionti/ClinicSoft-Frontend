import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ecografiarenal',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    CerrarsesionComponent
  ],
  templateUrl: './ecografiarenal.component.html',
  styleUrls: ['./ecografiarenal.component.css']
})


export class EcografiarenalComponent {
  ismicro_litiasiSi = false; 
  ishidronefrosisSi = false;
  iscalculosSi = false;
  isObservacionOtra = false;
  isObservacionNinguna = false;

  ecografiaProstaticaForm = new FormGroup({
    dni_ecografia_prostatica: new FormControl(''),
    nombre_ecografia_prostatica: new FormControl({ value: '', disabled: true }),
    apellido_ecografia_prostatica: new FormControl({ value: '', disabled: true }),
    edad_ecografia_prostatica: new FormControl({ value: '', disabled: true }),
    hc_ecografia_prostatica: new FormControl({ value: '', disabled: true }),
    motivo: new FormControl(''),
    fecha: new FormControl(''),
    morfologia_movilidad_derecho: new FormControl('Normal'),
    ecogenicidad_derecho: new FormControl('Normal'),
    medidas_longitud_derecho: new FormControl(''),
    medidas_parenquima_derecho: new FormControl(''),
    imagenes_expansivas_solidas_derecho: new FormControl('No'),
    imagenes_expansivas_quisticas_derecho: new FormControl('No'),
    hidronefrosis_derecho: new FormControl('No'),
    medidas_hidronefrosis: new FormControl(''),
    micro_litiasis_derecho: new FormControl('No'),
    calculos_derecho: new FormControl('No'),
    medidas_calculos_derecho: new FormControl(''),
    descripcion_otros_derecho: new FormControl(''),
    morfologia_movilidad_izquierdo: new FormControl('Normal'),
    ecogenicidad_izquierdo: new FormControl('Normal'),
    medidas_longitud_izquierdo: new FormControl(''),
    medidas_parenquima_izquierdo: new FormControl(''),
    imagenes_expansivas_solidas_izquierdo: new FormControl('No'),
    imagenes_expansivas_quisticas_izquierdo: new FormControl('No'),
    hidronefrosis_izquierdo: new FormControl('No'),
    micro_litiasis_izquierdo: new FormControl('No'),
    calculos_izquierdo: new FormControl('No'),
    medidas_calculos_izquierdo: new FormControl(''),
    descripcion_otros_izquierdo: new FormControl(''),
    repelcion_vejiga: new FormControl('Normal'),
    paredes_vejiga: new FormControl('Normal'),
    contenido_aneocoico: new FormControl('Sí'),
    imagenes_expansivas_vejiga: new FormControl('No'),
    calculos_vejiga: new FormControl('No'),
    vol_pre_miccional: new FormControl(''),
    vol_post_miccional: new FormControl(''),
    retencion: new FormControl(''),
    observacion: new FormControl(''),
    observacion_textarea: new FormControl(''),
    conclusiones: new FormControl('')
    
  });
  
 
  onmicro_litiasiChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.ismicro_litiasiSi = selectElement.value === 'Sí';

  }
  onhidronefrosisChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.ishidronefrosisSi = selectElement.value === 'Sí';
  
  }
  oncalculosChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.iscalculosSi = selectElement.value === 'Sí';

  }

  onObservacionChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isObservacionOtra = checkbox.value === 'otra' && checkbox.checked;
  }
  
}
