import { Component, OnInit } from '@angular/core';
import { ProcedimientosService } from './../services/procedimientos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ListasService } from '../../services/listas.service';
import { AdmisionesService } from '../../admisiones/services/admisiones.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-colposcopia',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './colposcopia.component.html',
  providers: [MessageService],
  styleUrl: './colposcopia.component.css'
})

export class ColposcopiaComponent implements OnInit {

  constructor(
    private ProcedimientosService: ProcedimientosService,
    private sanitizer: DomSanitizer,
    private listaServices: ListasService,
    private admisionServices: AdmisionesService,
    private messageService: MessageService,
    private PdfServices: PdfService
  ){}

  ngOnInit(): void {
    this.getColposcopias();
    this.getMedicos();
  }

  getColposcopia: any[] = [];
  file: any= [];
  previsualizacion: string = "";
  previsualizacion2: string = "";
  spinner = true;

  colposcopiasForm = new FormGroup ({
    dni_colposcopia: new FormControl(''),
    nombre_colposcopia: new FormControl(''),
    fecha_colposcopia: new FormControl(''),
    medico_colposcopia: new FormControl(''),
    escamo_colposcopia: new FormControl(''),
    cervix_colposcopia: new FormControl(''),
    vagina_colposcopia: new FormControl(''),
    vulva_colposcopia: new FormControl(''),
    perineo_colposcopia: new FormControl(''),
    parianal_colposcopia: new FormControl(''),
    biopsia_colposcopia: new FormControl(''),
    papanicolaou_colposcopia: new FormControl(''),
    conclusiones_colposcopia: new FormControl(''),
});

getColposcopias() {
  this.ProcedimientosService
      .getColposcopias()
      .subscribe((response: any ) => {
        this.getColposcopia = response;
      });
}

getMedico: any[] = [];
getMedicos() {
  this.listaServices
      .getDoctor()
      .subscribe((response: any ) => {
        this.getMedico = response;
      });
}

getPacientesId() {
  this.spinner = false;
  let documento = this.colposcopiasForm.get("dni_colposcopia")?.value
  this.colposcopiasForm.controls['nombre_colposcopia'].patchValue("");

  this.admisionServices
        .getPacientesId(documento)
        .subscribe((response: any)  => {
          if(response.status == 200) {
            this.colposcopiasForm.patchValue(
              {
                nombre_colposcopia: response.data.nombre  + ' ' + response.data.apellido
              }
            );
            this.showSuccess("Se ha encontrado el paciente");
            this.spinner = true;
          }
          else {
            this.showError(response.message);
            this.spinner = true;
          }

        })
}

createColposcopia(): void {
  let colposcopia: any = [
    {
     paciente: this.colposcopiasForm.get("dni_colposcopia")?.value,
     fecha: this.colposcopiasForm.get("fecha_colposcopia")?.value,
     medico: this.colposcopiasForm.get("medico_colposcopia")?.value,
     escamo_columnar: this.colposcopiasForm.get("escamo_colposcopia")?.value,
     endo_cervix: this.colposcopiasForm.get("cervix_colposcopia")?.value,
     perineo: this.colposcopiasForm.get("perineo_colposcopia")?.value,
     region_parianal: this.colposcopiasForm.get("parianal_colposcopia")?.value,
     biopsia: this.colposcopiasForm.get("biopsia_colposcopia")?.value,
     papanicolaou: this.colposcopiasForm.get("papanicolaou_colposcopia")?.value,
     conclusiones: this.colposcopiasForm.get("conclusiones_colposcopia")?.value,
     imagen1: this.colposcopiasForm.get("archivo1_colposcopia")?.value,
     imagen2: this.colposcopiasForm.get("archivo2_colposcopia")?.value,
     usuario: localStorage.getItem("usuario"),
     vagina: this.colposcopiasForm.get("vagina_colposcopia")?.value,
     vulva: this.colposcopiasForm.get("vulva_colposcopia")?.value,
     cmp: "123",

    }
  ];
  this.ProcedimientosService
    .createColposcopia(colposcopia)
    .subscribe((response: any) =>{
      console.log(response);
     });
}

imageUpload(e: any  ): void {
  const target = e.target as HTMLInputElement;
  const archivo = e.target.files[0];

  this.extraerBase64(archivo).then((imagen: any ) => {
    console.log(imagen);
    this.previsualizacion = imagen.base;
  });
  // this.file.push(archivo);
  // console.log(this.file);
}

imageUpload2(e: any  ): void {
  const target = e.target as HTMLInputElement;
  const archivo = e.target.files[0];

  this.extraerBase64(archivo).then((imagen: any ) => {
    console.log(imagen);
    this.previsualizacion2 = imagen.base;
  });
}

extraerBase64 = async($event: any ) => new Promise((resolve, reject) => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result
      });
    };
    reader.onerror = error => {
      resolve({
        base: null
      });
    };
  }
  catch (e) {
  }
});

generarPdfColposcopia() {
  this.PdfServices
      .generarPdfColposcopia();
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

