import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciarsesion.component.html'
})

export class IniciarsesionComponent implements OnInit {

  constructor(
    private login: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.validarSesion();
  }

  loginAlert = true;

  loginForm: FormGroup = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    recordar: new FormControl(),
  })

  iniciarSesion(): void {
    let usuario = this.loginForm.get("usuario")?.value,
        password = this.loginForm.get("password")?.value;

    this.login
        .iniciarSesion(usuario, password)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            sessionStorage.setItem('token', response.token);
            localStorage.setItem('token', JSON.stringify(response.token));

            let users: any  = [];
            users[0] = response.users.nombre;
            users[1] = response.users.apellido;
            users[2] = response.users.rol_usuario;
            users[3] = response.users.estado;
            users[4] = response.users.usuario;
            localStorage.setItem("users", JSON.stringify(users));
            this.router.navigate(['/', 'inicio']);
          }
          else {
            
            this.loginAlert = false;
          }
        })
    
  }

}
