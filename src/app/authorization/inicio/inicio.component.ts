import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MenuComponent, CerrarsesionComponent],
  templateUrl: './inicio.component.html',
})

export class InicioComponent {

}
