import { ListasService } from './../../services/listas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InventarioService } from '../services/inventario.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './productos.component.html',
  providers: [MessageService]
})
export class ProductosComponent implements OnInit {

  constructor(
    private inventarioServices: InventarioService,
    private listaServices: ListasService,
    private messageService: MessageService
  ){

  }
  ngOnInit(): void {
   this.getProducts();
   this.getCategories();
  }

  btnAgregarHidden = false;
  btnActualizarHidden = true;

  productosForm: FormGroup = new FormGroup ({
    categoria_productos: new FormControl('', [Validators.required]),
    nombre_productos: new FormControl('',[Validators.required]),
    codigo_productos: new FormControl('',[Validators.required]),
    barras_productos: new FormControl(''),
    medida_productos: new FormControl('',[Validators.required]),
    cantidad_productos: new FormControl('',[Validators.required]),
    precio_productos: new FormControl('',[Validators.required]),
    moneda_productos: new FormControl('',[Validators.required]),
    descripcion_productos: new FormControl('')
  });

  get categoriaControl(): FormControl {
    return this.productosForm.get('categoria_productos') as FormControl;
  }

  get nombreControl(): FormControl {
    return this.productosForm.get('nombre_productos') as FormControl;
  }

  get codigoControl(): FormControl {
    return this.productosForm.get('codigo_productos') as FormControl;
  }

  get medidasControl(): FormControl {
    return this.productosForm.get('medida_productos') as FormControl;
  }

  get cantidadControl(): FormControl {
    return this.productosForm.get('cantidad_productos') as FormControl;
  }

  get precioControl(): FormControl {
    return this.productosForm.get('precio_productos') as FormControl;
  }

  get monedaControl(): FormControl {
    return this.productosForm.get('moneda_productos') as FormControl;
  }

  getProduct: any [] = [];
  getProducts(){

    this.inventarioServices
        .getProducts()
        .subscribe((response: any) =>{
          console.log(response);
          this.getProduct = response;
    });
  }
  getCategorie: any [] = []
  getCategories() {

    this.listaServices
        .getCategories()
        .subscribe((response: any ) => {
          console.log(response);
          this.getCategorie = response
        });
  }

  pasarDatosForm(
    categoria: any,
    nombre: any,
    codigo: any,
    codigo_barras: any,
    medida: any,
    cantidad: any,
    precio: any,
    moneda: any,
    descripcion: any
  ){

    this.productosForm.patchValue(
      {
        categoria_productos: categoria,
        nombre_productos: nombre,
        codigo_productos: codigo,
        barras_productos: codigo_barras,
        medida_productos: medida,
        cantidad_productos: cantidad,
        precio_productos: precio,
        moneda_productos: moneda,
        descripcion_productos: descripcion
      }
     );
  }

  createProduct(): void {
    let producto: any = [
      {
        categoria: this.productosForm.get("categoria_productos")?.value,
        nombre: this.productosForm.get("nombre_productos")?.value,
        codigo: this.productosForm.get("codigo_productos")?.value,
        barras: this.productosForm.get("barras_productos")?.value,
        medida: this.productosForm.get("medida_productos")?.value,
        cantidad: this.productosForm.get("cantidad_productos")?.value,
        precio_u: this.productosForm.get("precio_productos")?.value,
        moneda: this.productosForm.get("moneda_productos")?.value,
        descripcion: this.productosForm.get("descripcion_productos")?.value,
        usuario: localStorage.getItem("usuario"),
      }
    ];
    this.inventarioServices
        .createProduct(producto)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.getProducts();
            this.productosForm.reset();
          }
          else {
            this.showError(response.mesagge);
          }
        }); 
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
}
