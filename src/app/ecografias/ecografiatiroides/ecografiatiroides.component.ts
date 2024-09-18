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
  templateUrl: './ecografiatiroides.component.html',
  styleUrl: './ecografiatiroides.component.css',
  providers: [ConfirmationService,MessageService]
})
export class EcografiatiroidesComponent implements OnInit {

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
  ecografiaTiroidesForm = new FormGroup({
    dni_ecografia_tiroides: new FormControl(''), // asi se de definir 
    nombre_ecografia_tiroides: new FormControl({value:'', disabled: true}),
    apellido_ecografia_tiroides: new FormControl({value:'', disabled: true}),
    edad_ecografia_tiroides: new FormControl({value:'', disabled: true}),
    hc_ecografia_tiroides: new FormControl({value:'', disabled: true}),
    descripcionTiroides: new FormControl('Ubicación central, Parénquima homogéneo, Volumen normal, No se observan lesiones focales'),
    lobuloDerecho: new FormControl(''),
    lobuloIzquierdo: new FormControl(''),
    istmo: new FormControl(''),
    estructurasVasculares: new FormControl(''),
    glandulasSubmaxilares: new FormControl(''),
    adenopatiaCervicales: new FormControl(''),
    piel: new FormControl(''),
    tcsc: new FormControl('De caracteres normales ecográficamente normales, no se observan quistes, ni nódulos'),
    conclusiones: new FormControl(''),
    sugerencias: new FormControl('')
  });

  buscarPacientes() {
    this.spinner = false;
    let documento = this.ecografiaTiroidesForm.get("dni_ecografia_tiroides")?.value;

    this.admisionServices
        .getPacientesId(documento)
        .subscribe((response: any ) => {
          if(response.status == 200) {

            this.ecografiaTiroidesForm.patchValue({
              nombre_ecografia_tiroides: response.data.nombre,
              apellido_ecografia_tiroides: response.data.apellido,
              edad_ecografia_tiroides: response.data.edad,
              hc_ecografia_tiroides: response.data.hc,
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

