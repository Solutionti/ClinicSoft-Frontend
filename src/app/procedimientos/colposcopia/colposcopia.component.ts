import { ProcedimientosService } from './../services/procedimientos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-colposcopia',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MenuComponent,
    CerrarsesionComponent,
    TableModule
  ],
  templateUrl: './colposcopia.component.html'
})
export class ColposcopiaComponent implements OnInit {

  constructor(
    private ProcedimientosService: ProcedimientosService
  ){}

  ngOnInit(): void {

  }

  colposcopiaForm: FormGroup = new FormGroup ({
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
    archivo1_colposcopia: new FormControl(''),
    archivo2_colposcopia: new FormControl('')
});

createColposcopia(): void {
  let colposcopia: any = [
    {
     paciente: this.colposcopiaForm.get("dni_colposcopia")?.value,
     fecha: this.colposcopiaForm.get("fecha_colposcopia")?.value,
     medico: this.colposcopiaForm.get("medico_colposcopia")?.value,
     escamo_columnar: this.colposcopiaForm.get("escamo_colposcopia")?.value,
     endo_cervix: this.colposcopiaForm.get("cervix_colposcopia")?.value,
     perineo: this.colposcopiaForm.get("perineo_colposcopia")?.value,
     region_parianal: this.colposcopiaForm.get("parianal_colposcopia")?.value,
     biopsia: this.colposcopiaForm.get("biopsia_colposcopia")?.value,
     papanicolaou: this.colposcopiaForm.get("papanicolaou_colposcopia")?.value,
     conclusiones: this.colposcopiaForm.get("conclusiones_colposcopia")?.value,
     imagen1: this.colposcopiaForm.get("archivo1_colposcopia")?.value,
     imagen2: this.colposcopiaForm.get("archivo2_colposcopia")?.value,
     usuario: localStorage.getItem("usuario"),
     cmp: "123",

    }
  ];
  this.ProcedimientosService
    .createColposcopia(colposcopia)
    .subscribe((response: any) =>{
     });
}



}
