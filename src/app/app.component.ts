import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'ClinicSoftWeb';

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validarSesion();
    this.primengConfig.ripple = true;
  }

  validarSesion() {
    const token = localStorage.getItem('token');
    if(token) {
      this.router.navigate(['/', 'inicio']);
    }
    else if(!token) {
      this.router.navigate(['/']);
    }
  }

}
