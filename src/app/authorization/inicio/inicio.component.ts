import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { InicioService } from '../services/inicio.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MenuComponent, CerrarsesionComponent, ChartModule, CommonModule],
  templateUrl: './inicio.component.html',
})

export class InicioComponent implements OnInit {

  constructor(
    private inicioServices: InicioService
  ) {}

  data: any;
  options: any;

  ngOnInit() {
    this.CountDoctors();
    this.countPagos();
    this.countHistory();
    this.countPatients();
    this.newPatients();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Laboratorio',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Admisiones',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
          color: textColor
        }
      }
    },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
          color: textColorSecondary
        },
        grid: {
        color: surfaceBorder,
        drawBorder: false
        }
      }
     }
   };
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

  newpatient: any[] = [];
  newPatients() {
    this.inicioServices
    .newPatients()
    .subscribe((response: any ) => {
      this.newpatient = response;
    });
  }

}
