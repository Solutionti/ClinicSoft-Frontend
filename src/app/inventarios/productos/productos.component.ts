import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../../componentes/componentes.module';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,MenuComponent,CerrarsesionComponent],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  ngOnInit(): void {

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
}
