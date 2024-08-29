import { Component, OnInit } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { TableModule } from 'primeng/table';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CerrarsesionComponent,
    MenuComponent,
    TableModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [ConfirmationService,MessageService]
})
export class UsuariosComponent implements OnInit {

  constructor(
    private loginServices: LoginService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ){}

  ngOnInit(): void {
    this.getUsers();
  }

  usuariosForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    telefono: new FormControl(''),
    permiso: new FormControl('', [Validators.required]),
    color: new FormControl(''),
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
    estado: new FormControl('Activo', [Validators.required]),
  });

  spinner = true;
  getUser: any[] = [];

  getUsers() {

    this.loginServices
        .getUsers()
        .subscribe((response: any ) => {
          this.getUser = response;
        })
  }

  registerUser() {
    this.spinner = false;
    let datos: any = [
      {
        ip: "192.168.0.1",
        usuario: this.usuariosForm.get("usuario")?.value,
        password: this.usuariosForm.get("contrasena")?.value,
        email: this.usuariosForm.get("correo")?.value,
        nombre: this.usuariosForm.get("nombre")?.value,
        apellido: this.usuariosForm.get("apellido")?.value,
        empresa: "CLINICA PERU",
        telefono: this.usuariosForm.get("telefono")?.value,
        rol_usuario: this.usuariosForm.get("permiso")?.value,
        estado: this.usuariosForm.get("estado")?.value,
        usuario_creacion: localStorage.getItem('usuario'),
        cmp: 0,
        color: this.usuariosForm.get("color")?.value,
      }
    ];
    this.loginServices
        .registerUser(datos)
        .subscribe((response: any ) => {
          if(response.status == 200) {
            this.showSuccess(response.message);
            this.usuariosForm.reset();
            this.getUsers();
            this.spinner = true;
          }
          else {
            this.spinner = true;
            this.showError(response.message);
            this.spinner = true;
          }
        });
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

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'ClinicSoft Aviso',
      detail: message
    });
  }

}
