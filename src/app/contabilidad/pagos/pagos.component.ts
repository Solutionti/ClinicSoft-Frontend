import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../../componentes/componentes.module';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,MenuComponent,CerrarsesionComponent],
  templateUrl: './pagos.component.html'
})
export class PagosComponent implements OnInit {

  ngOnInit(): void {

  }
}
