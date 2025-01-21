import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DigiturnoService } from '../services/digiturno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-digiturno',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './digiturno.component.html',
  styleUrl: './digiturno.component.css'
})
export class DigiturnoComponent implements OnInit, OnDestroy {
 
  private intervalId: any;
  constructor(
    private digiturnoServices: DigiturnoService
  ) {}

  ngOnInit(){
    this.getTurnos();

    this.digiturnoServices.miVariable$.subscribe(data => {
      console.log(`El valor de la variable cambio a: ${data}`);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }


  tableTurnos: any[] = [];
  getTurnos() {
    this.digiturnoServices
        .getTurnos()
        .subscribe((response: any ) => {
          this.tableTurnos = response;
        });
  }

  turno = "";
  getTurnoId() {
    this.intervalId = setInterval(() => {
      this.digiturnoServices
      .getTurnoId()
      .subscribe((response: any ) => {
        this.turno = response.orden__;
      });
    }, 4000);

    setTimeout(() => {
      this.digiturnoServices
      .getTurnoId()
      .subscribe((response: any ) => {
        this.turno = response.orden__;
      });
    }, 4000);
  }
  
  

}
