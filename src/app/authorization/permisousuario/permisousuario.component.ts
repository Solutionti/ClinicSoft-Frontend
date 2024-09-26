import { Component } from '@angular/core';
import { MenuComponent } from "../../componentes/menu/menu.component";
import { CerrarsesionComponent } from "../../componentes/cerrarsesion/cerrarsesion.component";
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-permisousuario',
  standalone: true,

imports: [
  MenuComponent,
  CerrarsesionComponent,
  TableModule
],
  templateUrl: './permisousuario.component.html',
  styleUrl: './permisousuario.component.css'
})
export class PermisousuarioComponent {

}
