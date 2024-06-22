import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ListasService } from '../../services/listas.service';
import { AdmisionesService } from '../../admisiones/services/admisiones.service';
@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    DialogModule
  ],
  templateUrl: './finanzas.component.html'
})
export class FinanzasComponent implements OnInit {

  constructor(
    private listaServices: ListasService,
    private admisionService: AdmisionesService
  ) {}

  ngOnInit(): void {
    this.getSpecialties();
    this.getLaboratoryTable();
  }

  especialidad = false;
  laboratorio = false;
  getSpeciality: any[] = [];
  getLaboratory: any[] = [];

  getSpecialties() {
    this.listaServices
        .getSpecialties()
        .subscribe((response: any ) => {
          this.getSpeciality = response;
        });
  }

  getLaboratoryTable() {
    this.listaServices
        .getLaboratoryTable()
        .subscribe((response: any ) => {
          this.getLaboratory = response;
        });
  }

}
