import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AdmisionesService } from '../../admisiones/services/admisiones.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-ecografia',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './ecografiahisterosonografia.component.html',
  styleUrl: './ecografiahisterosonografia.component.css',
  providers: [ConfirmationService,MessageService]
})
export class EcografiahisterosonografiaComponent implements OnInit {

  constructor(
    private admisionServices: AdmisionesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {

  }

  ecografia1: boolean = false;
  spinner = true;

  date = new Date();
  fechaActual = String(this.date.getFullYear() + '-' +
    String(this.date.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.date.getDate()).padStart(2, '0')
  );

  //definir el formGroup
  ecografiahisterosonografiaForm = new FormGroup({
    dni_ecografia_histerosonografia: new FormControl(''), // asi se de definir 
    nombre_ecografia_histerosonografia: new FormControl({value:'', disabled: true}),
    apellido_ecografia_histerosonografia: new FormControl({value:'', disabled: true}),
    edad_ecografia_histerosonografia: new FormControl({value:'', disabled: true}),
    hc_ecografia_histerosonografia: new FormControl({value:'', disabled: true}),
    motivo: new FormControl(''), // Aquí puedes poner un valor inicial si es necesario
    fecha: new FormControl(''),
    descripcionProcedimiento: new FormControl('Previa colocación de sondas foley N° 8 se instila 15 cc de NaCl 0.9%, se observa imágenes en cavidad endometrial una de 6 x 4 mm en pared psoterior a 17 mm del fondo de cavidad endometrial (tipo 0 ) y otro de 4 x 5 mm en cara anterior a 8 mm del fondo de la cavidad endometrial. LA PACIENTE TOLERA EL PROCEDIMIENTO.'),
    conclusiones: new FormControl(''),
    sugerencias: new FormControl('')
   
  });

  buscarPacientes() {
    this.spinner = false;
    let documento = this.ecografiahisterosonografiaForm.get("dni_ecografia_histerosonografia")?.value;

    this.admisionServices
        .getPacientesId(documento)
        .subscribe((response: any ) => {
          if(response.status == 200) {

            this.ecografiahisterosonografiaForm.patchValue({
              nombre_ecografia_histerosonografia: response.data.nombre,
              apellido_ecografia_histerosonografia: response.data.apellido,
              edad_ecografia_histerosonografia: response.data.edad,
              hc_ecografia_histerosonografia: response.data.hc,
            });
            this.showSuccess("Se ha encontrado el paciente");
            this.spinner = true;

          }
          else {
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

