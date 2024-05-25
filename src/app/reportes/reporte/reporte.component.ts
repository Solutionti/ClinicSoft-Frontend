import { Component } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CerrarsesionComponent, MenuComponent],
  templateUrl: './reporte.component.html'
})
export class ReporteComponent {

}
