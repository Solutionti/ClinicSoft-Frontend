import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-kardex',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule
  ],
  templateUrl: './kardex.component.html'
})
export class KardexComponent implements OnInit {

  ngOnInit(): void {

  }

  kardexForm = new FormGroup({
    producto_kardex: new FormControl(''),
    inicial_kardex: new FormControl(''),
    final_kardex: new FormControl(''),

  });
}
