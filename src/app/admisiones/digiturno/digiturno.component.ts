import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-digiturno',
  standalone: true,
  imports: [],
  templateUrl: './digiturno.component.html',
  styleUrl: './digiturno.component.css'
})
export class DigiturnoComponent implements OnInit {
 

  constructor(
  ) {}

  ngOnInit(): void {
   
  }

  public executeFunction() {
    console.log('Función del hijo ejecutada');
  }
  

}
