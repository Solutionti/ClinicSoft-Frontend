import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-historialpaciente',
  standalone: true,
  imports: [MenuComponent,CerrarsesionComponent],
  templateUrl: './historialpaciente.component.html',
  styleUrl: './historialpaciente.component.css'
})
export class HistorialpacienteComponent {

}
