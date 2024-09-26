import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';

@Component({
  selector: 'app-ecografiaobstetrica',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    CerrarsesionComponent,
  ],
  templateUrl: './ecografiaobstetrica.component.html',
  styleUrl: './ecografiaobstetrica.component.css'
})
export class EcografiaobstetricaComponent {

}
