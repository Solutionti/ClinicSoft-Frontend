import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [TableModule,ButtonModule,ToolbarModule,ToastModule],
  templateUrl: './iniciarsesion.component.html',
})
export class IniciarsesionComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }

}
