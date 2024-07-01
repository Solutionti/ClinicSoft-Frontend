import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { InicioService } from '../services/inicio.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MenuComponent, CerrarsesionComponent],
  templateUrl: './inicio.component.html',
})

export class InicioComponent implements OnInit {

  constructor(
    private inicioServices: InicioService
  ) {}

  ngOnInit(): void {
    this.countPatients();
    this.countHistory();
    this.countPagos();
    this.CountDoctors();
  }

  pacientes = "";
  countPatients() {
    this.inicioServices
        .countPatients()
        .subscribe((response: any ) => {
          this.pacientes = response;
        });
  }

  historias = ""
  countHistory() {
    this.inicioServices
    .countHistory()
    .subscribe((response: any ) => {
      this.historias = response;
    });
  }

  pagos = "";
  countPagos() {
    this.inicioServices
    .countPagos()
    .subscribe((response: any ) => {
      this.pagos = response;
    });
  }

  doctores = "";
  CountDoctors() {
    this.inicioServices
    .CountDoctors()
    .subscribe((response: any ) => {
      this.doctores = response;
    });
  }

  newPatients() {
    this.inicioServices
    .CountDoctors()
    .subscribe((response: any ) => {
      console.log();
    });
  }

}
