import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-ecografiaprostatica',
  standalone: true,
  imports: [
    MenuComponent,
    CerrarsesionComponent
  ],
  templateUrl: './ecografiaprostatica.component.html',
  styleUrl: './ecografiaprostatica.component.css'
})
export class EcografiaprostaticaComponent {

}
