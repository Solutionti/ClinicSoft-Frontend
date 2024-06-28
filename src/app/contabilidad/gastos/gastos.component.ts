import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ContabilidadService } from '../services/contabilidad.service';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    DialogModule,
    ToastModule,
    CommonModule
  ],
  templateUrl: './gastos.component.html'
})
export class GastosComponent implements OnInit {

  gastos = false;
  constructor(
    private contabilidadServices: ContabilidadService
  ){

  }
  ngOnInit(): void {
    this.getGasto();
  }

  registrarForm: FormGroup = new FormGroup({
    comprobante_gastos: new FormControl('',[Validators.required]),
    serie_gastos: new FormControl('',[Validators.required]),
    correlativo_gastos: new FormControl('',[Validators.required]),
    gravada_gastos: new FormControl('',[Validators.required]),
    igv_gastos: new FormControl('',[Validators.required]),
    total_gastos: new FormControl('',[Validators.required]),
    emision_gastos: new FormControl('',[Validators.required]),
    recepcion_gastos: new FormControl('',[Validators.required]),
    descripcion_gastos: new FormControl('',[Validators.required]),
    tipo_gastos: new FormControl(''),
    documento_gastos: new FormControl(''),
    razon_gastos: new FormControl('',[Validators.required]),
    informacion_gastos: new FormControl(''),
    responsable_gastos: new FormControl('',[Validators.required]),
  });

  get comprobanteControl(): FormControl {
    return this.registrarForm.get('comprobante_gastos') as FormControl;
  }
  get serieControl(): FormControl {
    return this.registrarForm.get('serie_gastos') as FormControl;
  }
  get correlativoControl(): FormControl {
    return this.registrarForm.get('correlativo_gastos') as FormControl;
  }
  get gravadaControl(): FormControl {
    return this.registrarForm.get('gravada_gastos') as FormControl;
  }
  get igvControl(): FormControl {
    return this.registrarForm.get('igv_gastos') as FormControl;
  }
  get totalControl(): FormControl {
    return this.registrarForm.get('total_gastos') as FormControl;
  }
  get emisionControl(): FormControl {
    return this.registrarForm.get('emision_gastos') as FormControl;
  }
  get recepcionControl(): FormControl {
    return this.registrarForm.get('recepcion_gastos') as FormControl;
  }
  get descripcionControl(): FormControl {
    return this.registrarForm.get('descripcion_gastos') as FormControl;
  }
  get razonControl(): FormControl {
    return this.registrarForm.get('razon_gastos') as FormControl;
  }
  get responsableControl(): FormControl {
    return this.registrarForm.get('responsable_gastos') as FormControl;
  }

  getGastos: any[] = [];
  getGasto() {
    this.contabilidadServices
        .getGasto()
        .subscribe((response: any ) => {
          console.log(response);
          this.getGastos = response;
        });
  }
}
