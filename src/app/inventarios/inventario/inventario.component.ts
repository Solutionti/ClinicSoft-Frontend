import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InventarioService } from '../services/inventario.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    ToastModule
  ],
  providers:[MessageService],
  templateUrl: './inventario.component.html'
})
export class InventarioComponent  implements OnInit {


  constructor(
    private inventarioServices: InventarioService,
    private messageService: MessageService,
    private pdfServices: PdfService
  ){

  }

  ngOnInit(): void {

  }

  inventarioForm = new FormGroup({
    empresa_inventario: new FormControl({value:'SEDE PRINCIPAL', disabled: true}),
    stock_inventario: new FormControl(''),
    cant_inventario: new FormControl('')
  })

  getInventorie: any [] = [];
  getInventories(){
    let cantidad = this.inventarioForm.get('cant_inventario')?.value;
    let signo = this.inventarioForm.get('stock_inventario')?.value;
    this.inventarioServices
        .getInventories(cantidad, signo)
        .subscribe((response: any) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.getInventorie = response.data;
          }
      else {
        this.showError(response.mesagge);
      }
    })
  }

  pdfInventario() {
    let valor = this.inventarioForm.get("stock_inventario")?.value,
        cantidad = this.inventarioForm.get("cant_inventario")?.value;

    this.pdfServices
        .generarPdfInventario(cantidad, valor);
  }

  showError(message: string) {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'ClinicSoft Aviso',
        detail: message
      }
    );
  }
  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'ClinicSoft Aviso',
      detail: message
    });
  }


}
