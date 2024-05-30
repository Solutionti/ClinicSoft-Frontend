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

@Component({
  selector: 'app-kardex',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    CommonModule
  ],
  templateUrl: './kardex.component.html'
})
export class KardexComponent implements OnInit {

  constructor(
    private InventarioService: InventarioService,
    private ListasService: ListasService
  ){}

  ngOnInit(): void {

    this.getProducts();
   this.getCategories();
  }

  btnPdfHidden = true;

  kardexForm: FormGroup = new FormGroup({
    categoria_kardex: new FormControl('',[Validators.required]),
    producto_kardex: new FormControl('',[Validators.required]),
    inicial_kardex: new FormControl('',[Validators.required]),
    final_kardex: new FormControl('',Validators.required),
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

  getProduct: any [] = [];
  getProducts(){

    this.InventarioService
        .getProducts()
        .subscribe((response: any) =>{
          console.log(response);
          this.getProduct = response;
    });
  }
  getCategorie: any [] = []
  getCategories() {

    this.ListasService
        .getCategories()
        .subscribe((response: any ) => {
          console.log(response);
          this.getCategorie = response
        });
  }
}
