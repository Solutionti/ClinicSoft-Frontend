import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { exit } from 'process';

@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [ReactiveFormsModule,ToastModule],
  templateUrl: './iniciarsesion.component.html',
  providers: [MessageService],
  styleUrl: './iniciarsesion.component.css',
})

export class IniciarsesionComponent implements OnInit {

  constructor(
    private login: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.spinner = false;
  }

  ngOnInit(): void {
    this.validarSesion();
    this.spinner = true;
  }

  loginAlert = true;
  spinnerLogin = true;
  spinner = false;
  typepassword = 'password';
  ocultarhidden = true;
  verhidden = false

  loginForm: FormGroup = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    recordar: new FormControl(),
  })

  iniciarSesion(): void {
    let usuario = this.loginForm.get("usuario")?.value,
        password = this.loginForm.get("password")?.value;
    this.spinnerLogin = true;
    this.login
        .iniciarSesion(usuario, password)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            sessionStorage.setItem('token', response.token);
            localStorage.setItem('token', JSON.stringify(response.token));
            localStorage.setItem('nombre', response.users.nombre.toUpperCase());
            localStorage.setItem('apellido', response.users.apellido.toUpperCase());
            localStorage.setItem('usuario', response.users.usuario.toUpperCase());
            localStorage.setItem('rol', response.users.rol_usuario.toUpperCase());
            localStorage.setItem('estado', response.users.estado.toUpperCase());
            this.spinner = false;
            this.showSuccess();
            setTimeout(() => {
              this.router.navigate(['/', 'inicio']);
              this.spinner = true;
            }, 3000)
          }
          else {
            let message = "El usuario y/o contraseña ingresado son invalidos."
            this.showError(message);
            this.spinner = true;
          }
        }) 
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

  showSuccess() {
    let nombre = localStorage.getItem('nombre');
    let apellido = localStorage.getItem('apellido');
    let rol = localStorage.getItem('rol');
    this.messageService.add({
      severity: 'success',
      summary: 'Bienvenido a ClinicSoft  !!', 
      detail: nombre?.slice(0, -1).toLocaleUpperCase() + '  ' +  apellido?.slice(1, -1).toLocaleUpperCase() + ' ' + rol?.slice(1, -1).toLocaleUpperCase()
    });
  }

  validarSesion() {
    
    const token = localStorage.getItem('token');
    if(token) {
      this.router.navigate(['/', 'inicio']);
    }
    else{
      this.router.navigate(['/']);
    }
  }

  verContrasena() {
    this.typepassword = 'text';
    this.verhidden = true;
    this.ocultarhidden = false;
  }

  ocultarContrasena() {
    this.typepassword = 'password';
    this.verhidden = false;
    this.ocultarhidden = true;
  }
}
