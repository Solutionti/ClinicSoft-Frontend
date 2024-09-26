import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ecografiaprostatica',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    ReactiveFormsModule,
    CerrarsesionComponent
  ],
  templateUrl: './ecografiaprostatica.component.html',
  styleUrls: ['./ecografiaprostatica.component.css']
})


export class EcografiaprostaticaComponent {
  isContenidoAnecoicoNo = false;
  isImagenesExpansivasSi = false; 
  isCalculosSi = false;
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
    replicacion: new FormControl('Normal'),
    paredes: new FormControl('Normal'),
    contenido: new FormControl('Sí'),
    detalle_contenido: new FormControl(''),
    imagenes_expansivas: new FormControl('No'),
    detalle_imagenes: new FormControl(''),
    calculos: new FormControl('No'),
    detalle_calculos: new FormControl(''),
    vol_pre: new FormControl(''),
    vol_post: new FormControl(''),
    retencion: new FormControl(''),
    descripcion: new FormControl(''),
    bordes: new FormControl('Regulares'),
    transverso: new FormControl(''),
    antero_posterior: new FormControl(''),
    longitudinal: new FormControl(''),
    volumen: new FormControl(''),
    observacion: new FormControl(''),
    observacion_textarea: new FormControl(''),
    conclusiones: new FormControl(''),
  });
  
  onContenidoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.isContenidoAnecoicoNo = selectElement.value === 'No';
  }

  onImagenesExpansivasChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.isImagenesExpansivasSi = selectElement.value === 'Sí';

  }
  onCalculosChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.isCalculosSi = selectElement.value === 'Sí';
  
  }

  onObservacionChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isObservacionOtra = checkbox.value === 'otra' && checkbox.checked;
  }
  
}
