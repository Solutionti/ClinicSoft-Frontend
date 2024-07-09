import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ContabilidadService } from '../services/contabilidad.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule
  ],
  templateUrl: './pagos.component.html'
})
export class PagosComponent implements OnInit {

  constructor(
    private contabilidadService: ContabilidadService,
    private PdfServices: PdfService
  ){}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayment: any[] = [];
  getPayments() {
    this.contabilidadService
        .getPayments()
        .subscribe((response: any ) => {
          this.getPayment = response;
        });
  }

  generarpdfPagos() {
    this.PdfServices
        .generarpdfPagos();
  }
}
