import { ListasService } from './../../services/listas.service';
import { InventarioService } from './../services/inventario.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import internal from 'stream';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PdfService } from '../../services/pdf.service';
@Component({
  selector: 'app-kardex',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './kardex.component.html',
  providers: [MessageService]
})
export class KardexComponent implements OnInit {

  constructor(
    private InventarioService: InventarioService,
    private ListasService: ListasService,
    private messageService: MessageService,
    private pdfServices: PdfService
  ){}

  ngOnInit(): void {

    this.getProducts();
   this.getCategories();
  }

  btnPdfHidden = true;
  visible: boolean = false;
  visible1: boolean = false;

  kardexForm: FormGroup = new FormGroup({
    categoria_kardex: new FormControl('',[Validators.required]),
    producto_kardex: new FormControl('',[Validators.required]),
    inicial_kardex: new FormControl('',[Validators.required]),
    final_kardex: new FormControl('',Validators.required),
  });

  entradaForm: FormGroup = new FormGroup({
    producto_entrada: new FormControl('',[Validators.required]),
    cantidad_entrada: new FormControl('',[Validators.required]),
    stock_entrada: new FormControl('',[Validators.required]),
    seccion_entrada: new FormControl('',[Validators.required]),
    motivo_entrada: new FormControl('',[Validators.required]),
    comentarios_entrada: new FormControl('',[Validators.required])

  });

  salidaForm: FormGroup = new FormGroup({
    producto_salida: new FormControl('',[Validators.required]),
    cantidad_salida: new FormControl('',[Validators.required]),
    stock_salida: new FormControl('',[Validators.required]),
    seccion_salida: new FormControl('',[Validators.required]),
    motivo_salida: new FormControl('',[Validators.required]),
    comentarios_salida: new FormControl('',[Validators.required])

  });


  get categoriaControl(): FormControl {
    return this.kardexForm.get('categoria_kardex') as FormControl;
  }

  get productoControl(): FormControl {
    return this.kardexForm.get('producto_kardex') as FormControl;
  }

  get inicialControl(): FormControl {
    return this.kardexForm.get('inicial_kardex') as FormControl;
  }

  get finalControl(): FormControl {
    return this.kardexForm.get('final_kardex') as FormControl;
  }

  get producto_entrada(): FormControl {
    return this.entradaForm.get('producto_entrada') as FormControl;
  }

  get cantidad_entrada(): FormControl {
    return this.entradaForm.get('cantidad_entrada') as FormControl;
  }

  get stock_entrada(): FormControl {
    return this.entradaForm.get('stock_entrada') as FormControl;
  }

  get seccion_entrada(): FormControl {
    return this.entradaForm.get('seccion_entrada') as FormControl;
  }

  get motivo_entrada(): FormControl {
    return this.entradaForm.get('motivo_entrada') as FormControl;
  }

  get comentarios_entrada(): FormControl {
    return this.entradaForm.get('comentarios_entrada') as FormControl;
  }

  get producto_salida(): FormControl {
    return this.salidaForm.get('producto_salida') as FormControl;
  }

  get cantidad_salida(): FormControl {
    return this.salidaForm.get('cantidad_salida') as FormControl;
  }

  get stock_salida(): FormControl {
    return this.salidaForm.get('stock_salida') as FormControl;
  }

  get seccion_salida(): FormControl {
    return this.salidaForm.get('seccion_salida') as FormControl;
  }

  get motivo_salida(): FormControl {
    return this.salidaForm.get('motivo_salida') as FormControl;
  }

  get comentarios_salida(): FormControl {
    return this.salidaForm.get('comentarios_salida') as FormControl;
  }

  getProduct: any [] = [];
  getProducts(){

    this.InventarioService
        .getProducts()
        .subscribe((response: any) =>{
          this.getProduct = response;
    });
  }
  getCategorie: any [] = [];
  getCategories() {

    this.ListasService
        .getCategories()
        .subscribe((response: any ) => {
          this.getCategorie = response
    });
  }

  getKarde: any [] = [];
  getKardex(){
    let producto = this.kardexForm.get("producto_kardex")?.value;
    let fechainicial = this.kardexForm.get("inicial_kardex")?.value;
    let fechafinal = this.kardexForm.get("final_kardex")?.value;
    this.InventarioService
        .getKardex(producto,fechainicial,fechafinal)
        .subscribe((response: any) => {
          this.getKarde = response;
    });

  }

  Creatstart(): void {
    let entrada: any = [
      {
        producto: this.entradaForm.get("producto_entrada")?.value,
        cantidad: this.entradaForm.get("cantidad_entrada")?.value,
        stock: this.entradaForm.get("stock_entrada")?.value,
        seccion: this.entradaForm.get("seccion_entrada")?.value,
        comentarios: this.entradaForm.get("comentarios_entrada")?.value,
        motivo: this.entradaForm.get("motivo_entrada")?.value,
        usuario: localStorage.getItem("usuario"),
    }
  ];

  this.InventarioService
      .Creatstart(entrada)
      .subscribe((response: any ) => {
        if(response.status == 200) {
          this.showSuccess(response.message);
          this.entradaForm.reset();
        }
        else {
          this.showError(response.mesagge);
        }
      });
  }

  createEnd(): void {
    let salida: any = [
      {
        producto: this.salidaForm.get("producto_salida")?.value,
        cantidad: this.salidaForm.get("cantidad_salida")?.value,
        stock: this.salidaForm.get("stock_salida")?.value,
        seccion: this.salidaForm.get("seccion_salida")?.value,
        comentarios: this.salidaForm.get("comentarios_salida")?.value,
        motivo: this.salidaForm.get("motivo_salida")?.value,
        usuario: localStorage.getItem("usuario"),
    }
  ];

  this.InventarioService
      .Creatstart(salida)
      .subscribe((response: any ) => {
        if(response.status == 200) {
          this.showSuccess(response.message);
          this.entradaForm.reset();
        }
        else {
          this.showError(response.mesagge);
        }
      });
  }

  pdfKardex() {
    let producto = this.kardexForm.get("producto_kardex")?.value,
    fechainicial = this.kardexForm.get("inicial_kardex")?.value,
    fechafinal = this.kardexForm.get("final_kardex")?.value;

    this.pdfServices
        .generarPdfKardex(producto,fechainicial,fechafinal);
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

  showDialog1() {
    this.visible = true;
  }

  showDialog2() {
    this.visible1 = true;
  }



}
