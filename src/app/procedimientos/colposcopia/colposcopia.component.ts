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
    private PdfServices: PdfService,
  ){}

  ngOnInit(): void {
    this.getColposcopias();
    this.getMedicos();
  }

  getColposcopia: any[] = [];
  file: any= [];
  previsualizacion: string = "";
  previsualizacion2: string = "";
  public archivo1: any = [];
  public archivo2: any = [];
  spinner = true;
  date = new Date();
  fechaActual = String(this.date.getFullYear() + '-' +
    String(this.date.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.date.getDate()).padStart(2, '0')
  );

  colposcopiasForm = new FormGroup ({
    dni_colposcopia: new FormControl(''),
    nombre_colposcopia: new FormControl({value: '', disabled: true }),
    fecha_colposcopia: new FormControl({value: this.fechaActual, disabled: true }),
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

imageUpload(e: any  ): void {
  this.archivo1 = [];
  const target = e.target as HTMLInputElement;
  const archivo = e.target.files[0];

  this.extraerBase64(archivo).then((imagen: any ) => {
    this.previsualizacion = imagen.base;
  });

  this.archivo1.push(archivo);
}

createColposcopia(): any  {
     this.spinner = false;
     let paciente: any = this.colposcopiasForm.get("dni_colposcopia")?.value,
     fecha: any = this.colposcopiasForm.get("fecha_colposcopia")?.value,
     medico: any = this.colposcopiasForm.get("medico_colposcopia")?.value,
     escamo_columnar: any = this.colposcopiasForm.get("escamo_colposcopia")?.value,
     endo_cervix: any = this.colposcopiasForm.get("cervix_colposcopia")?.value,
     perineo: any = this.colposcopiasForm.get("perineo_colposcopia")?.value,
     region_parianal: any = this.colposcopiasForm.get("parianal_colposcopia")?.value,
     biopsia: any = this.colposcopiasForm.get("biopsia_colposcopia")?.value,
     papanicolaou: any = this.colposcopiasForm.get("papanicolaou_colposcopia")?.value,
     conclusiones: any = this.colposcopiasForm.get("conclusiones_colposcopia")?.value,
     usuario: any = localStorage.getItem("usuario"),
     vagina: any = this.colposcopiasForm.get("vagina_colposcopia")?.value,
     vulva: any = this.colposcopiasForm.get("vulva_colposcopia")?.value,
     cmp: any = "123";


  try {
    const formdata = new FormData();

    this.archivo1.forEach((element: any) => {
      formdata.append('archivo', this.archivo1[0]);
    });
    this.archivo1.forEach((element: any) => {
      formdata.append('archivo1', this.archivo2[0]);
    });

    formdata.append('paciente', paciente);
    formdata.append('fecha', fecha);
    formdata.append('medico', medico);
    formdata.append('escamo_columnar', escamo_columnar);
    formdata.append('endo_cervix', endo_cervix);
    formdata.append('perineo', perineo);
    formdata.append('region_parianal', region_parianal);
    formdata.append('biopsia', biopsia);
    formdata.append('papanicolaou', papanicolaou);
    formdata.append('conclusiones', conclusiones);
    formdata.append('usuario', usuario);
    formdata.append('vagina', vagina);
    formdata.append('vulva', vulva);
    formdata.append('cmp', cmp);

    this.ProcedimientosService
    .createColposcopia(formdata)
    .subscribe((response: any) =>{
      if(response.status == 200) {
        this.showSuccess(response.message);
        this.getColposcopias();
        this.spinner = true;
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
      else {
        this.showError(response.message);
        this.spinner = true;
      }
     });
  }
  catch(e) {

  }
}

imageUpload2(e: any  ): void {
  this.archivo2 = [];
  const target = e.target as HTMLInputElement;
  const archivo = e.target.files[0];

  this.extraerBase64(archivo).then((imagen: any ) => {
    this.previsualizacion2 = imagen.base;
  });

  this.archivo2.push(archivo);
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

