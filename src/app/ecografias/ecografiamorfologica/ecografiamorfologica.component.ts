import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-ecografiamorfologica',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    CerrarsesionComponent,
  ],
  templateUrl: './ecografiamorfologica.component.html',
  styleUrl: './ecografiamorfologica.component.css'
})
export class EcografiamorfologicaComponent {

}
