import { ListasService } from './../../services/listas.service';
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
import { MessageService } from 'primeng/api';

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
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css',
  providers: [MessageService]
})
export class GastosComponent implements OnInit {

  gastos = false;
  spinner=  true;

  constructor(
    private contabilidadServices: ContabilidadService,
    private ListasService: ListasService,
    private messageService: MessageService
  ){

  }
  ngOnInit(): void {
    this.getGasto();
    this.getUsersAll();
  }

  registrarForm: FormGroup = new FormGroup({
    comprobante_gastos: new FormControl('',[Validators.required]),
    serie_gastos: new FormControl('',[Validators.required]),
    correlativo_gastos: new FormControl('',[Validators.required]),
    gravada_gastos: new FormControl({ value:'', disabled: true },[Validators.required]),
    igv_gastos: new FormControl({ value:'', disabled: true },[Validators.required]),
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


  getUsers: any[] = [];
  getUsersAll() {
    this.ListasService
       .getUsersAll()
       .subscribe((response: any) => {
        console.log(response);
        this.getUsers = response;

       })
  }

  createGasto(): void {
    this.spinner = false;
    let tipo_doc = this.registrarForm.get("comprobante_gastos")?.value,
        nro_doc = this.registrarForm.get("documento_gastos")?.value,
        razon_social = this.registrarForm.get("razon_gastos")?.value,
        descripcion = this.registrarForm.get("descripcion_gastos")?.value,
        f_recepcion = this.registrarForm.get("recepcion_gastos")?.value,
        f_emision = this.registrarForm.get("emision_gastos")?.value,
        tipo_cpe = this.registrarForm.get("comprobante_gastos")?.value,
        serie = this.registrarForm.get("serie_gastos")?.value,
        numero = this.registrarForm.get("correlativo_gastos")?.value,
        sub_total = this.registrarForm.get("total_gastos")?.value,
        igv = this.registrarForm.get("igv_gastos")?.value,
        op_grav = this.registrarForm.get("gravada_gastos")?.value,
        op_inafec = "0",
        op_exone = "0",
        monto = this.registrarForm.get("total_gastos")?.value,
        rpta_sunat = "0",
        estado = "0",
        codigo_usuario = this.registrarForm.get("responsable_gastos")?.value,
        codigo_usuario_sys = this.registrarForm.get("responsable_gastos")?.value;

        let gastos: any = [{

          "tipo_doc": tipo_doc,
          "nro_doc": nro_doc,
          "razon_social": razon_social,
          "descripcion": descripcion,
          "f_recepcion": f_recepcion,
          "f_emision": f_emision,
          "tipo_cpe": tipo_cpe,
          "serie": serie,
          "numero": numero,
          "sub_total": sub_total,
          "igv": igv,
          "op_grav": op_grav,
          "op_inafec": op_inafec,
          "op_exone": op_exone,
          "monto": monto,
          "rpta_sunat": rpta_sunat,
          "estado": estado,
          "codigo_usuario": codigo_usuario,
          "codigo_usuario_sys": codigo_usuario_sys,

        }
      ];

      this.contabilidadServices
          .createGasto(gastos)
          .subscribe((response: any) =>{
            if(response.status == 200) {
              this.showSuccess(response.message);
              this.getGasto();
              this.spinner = true;

            // Transaccion
            let datos2 = [
              {
                transaccion: "Creacion de laboratorio",
                valor: gastos[0].sub_total,
                usuario: localStorage.getItem('usuario'),
                tipoingreso: "Gasto"
              }
            ];
            this.ListasService
                .createTransaccion(datos2)
                .subscribe((response: any ) => {

                });
            }
            else {
              this.showError(response.message);
              this.spinner = true;
            }
          })
  }

  showError(message: string) {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'ClinicSoft Aviso',
        detail: message
      }
    );
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'ClinicSoft Aviso',
      detail: message
    });
  }

  calcularInpuestos() {
    let comprobante = this.registrarForm.get("comprobante_gastos")?.value,
        total = this.registrarForm.get("total_gastos")?.value;

    let gravada: any  = (total / 1.18).toFixed(2);
    let igv: any  = (total - gravada).toFixed(2);

    if(comprobante == "1") {
      this.registrarForm.patchValue({
        gravada_gastos: gravada,
        igv_gastos: igv
      });

    }
    else {
      this.registrarForm.patchValue({
        gravada_gastos: 0,
        igv_gastos: 0
      }); 
    }
  }

}
