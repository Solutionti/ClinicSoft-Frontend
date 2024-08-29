import { Component, OnInit, ViewChild } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import allLocales from '@fullcalendar/core/locales-all';
import timeGridPlugin from '@fullcalendar/timegrid'
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListasService } from '../../services/listas.service';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    CerrarsesionComponent,
    MenuComponent,
    FullCalendarModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './citas.component.html',
  providers: [DatePipe]
})

export class CitasComponent implements OnInit  {
  date: Date[] | undefined;

  constructor(
    private listaServices: ListasService,
    private datePipe: DatePipe
  ) {
   
  }
  
  ngOnInit(): void {
    this.getDoctores();
  }

  calendarForm = new FormGroup({
    calendar_input: new FormControl('')
  });

  RegistroCitasForm = new FormGroup({
    medico_cita: new FormControl(''),
    fecha_cita: new FormControl(''),
    dni_cita: new FormControl(''),
    nombre_cita: new FormControl(''),
    celular_cita: new FormControl(''),
    estado_cita: new FormControl('Pendiente'),
    observaciones_cita: new FormControl(''),
  });

  visible1 = true;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, listPlugin,timeGridPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay' // user can switch between the two
    },
    locales: allLocales,
    locale: 'es',
    editable: false,
    selectable: true,
    themeSystem: 'bootstrap',
    eventDisplay: 'block', 
    events: function(fetchInfo, successCallback, failureCallback) {
      fetch('http://localhost:8000/clinicsoft/getCitas')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          successCallback(data);
        })
        .catch(error => {
          failureCallback(error);
        });
    },
    eventAdd: function(info) {
      alert('Evento agregado: ' + info.event.title); 
    }
  };

  getDoctor: any[] = [];
  getDoctores(){
    this.listaServices
        .getDoctor()
        .subscribe((response: any ) => {
          this.getDoctor = response;
          
        });
  }

  addEvent() {
    let fecha: any = this.calendarForm.get("calendar_input")?.value;
    const date = new Date(fecha);

    let transforDate = this.datePipe.transform(date, 'dd-MM-yyyy');

    alert(transforDate);
  }
}
