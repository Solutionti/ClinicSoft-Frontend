import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MenuComponent,CerrarsesionComponent],
  templateUrl: './finanzas.component.html'
})
export class FinanzasComponent implements OnInit {

  ngOnInit(): void {

  }

}
