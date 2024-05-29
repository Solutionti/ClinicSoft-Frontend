import { ListasService } from './../../services/listas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { response } from 'express';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule
  ],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  constructor(
    private inventarioServices: InventarioService
  ){

  }
  ngOnInit(): void {
   this.getProducts();
  }

  productosForm = new FormGroup ({
    categoria_productos: new FormControl(''),
    nombre_productos: new FormControl(''),
    codigo_productos: new FormControl(''),
    barras_productos: new FormControl(''),
    medida_productos: new FormControl(''),
    cantidad_productos: new FormControl(''),
    precio_productos: new FormControl(''),
    moneda_productos: new FormControl(''),
    descripcion_productos: new FormControl('')
  });

  getProduct: any [] = [];
  getProducts(){

    this.inventarioServices
        .getProducts()
        .subscribe((response: any) =>{
          console.log(response);
          this.getProduct = response;
    });
  }
}
