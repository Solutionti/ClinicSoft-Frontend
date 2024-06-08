import { Component } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CerrarsesionComponent, MenuComponent, DialogModule, ButtonModule],
  templateUrl: './reporte.component.html'
})
export class ReporteComponent {
  visible = false
}
