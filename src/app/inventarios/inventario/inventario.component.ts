import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InventarioService } from '../services/inventario.service';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule
  ],
  templateUrl: './inventario.component.html'
})
export class InventarioComponent  implements OnInit {

  constructor(
    private inventarioServices: InventarioService,

  ){

  }

  ngOnInit(): void {

    this.getInventories();
  }

  inventarioForm = new FormGroup({
    empresa_inventario: new FormControl(''),
    stock_inventario: new FormControl(''),
    cant_inventario: new FormControl(''),
    codigo_inventario: new FormControl(''),
    inicial_inventario: new FormControl(''),
    final_inventario: new FormControl(''),
  })

  getInventorie: any [] = [];
  getInventories(){
    this.inventarioServices
    .getInventories()
    .subscribe((response: any) => {
      console.log(response);

      this.getInventorie = response;
    })
  }


}
