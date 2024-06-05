import { Component } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CerrarsesionComponent,
    MenuComponent,
    TableModule
  ],
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {

}
