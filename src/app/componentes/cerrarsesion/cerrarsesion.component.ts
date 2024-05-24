import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrarsesion',
  standalone: true,
  imports: [],
  templateUrl: './cerrarsesion.component.html',
})

export class CerrarsesionComponent implements OnInit {
  
  @Input() titulo: string="";

  constructor(
    private router: Router
  ) {

  }
  
  ngOnInit(): void {
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
