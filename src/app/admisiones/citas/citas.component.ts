import { Component, OnInit } from '@angular/core';
import { CerrarsesionComponent } from '../../componentes/cerrarsesion/cerrarsesion.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import allLocales from '@fullcalendar/core/locales-all';
@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CerrarsesionComponent, MenuComponent, FullCalendarModule],
  templateUrl: './citas.component.html',
})

export class CitasComponent implements OnInit  {

  constructor() {

  }

  ngOnInit(): void {

  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
    locales: allLocales,
    locale: 'es',
    editable: true,
    selectable: true,
    dateClick: function(info) {
      alert('Clicked on: ' + info.dateStr);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('Current view: ' + info.view.type);
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = 'red';
    },
    events: [
      { title: 'event 1', date: '2024-06-09' },
      { title: 'event 2', date: '2024-06-08' },
    ]
  };

  handleDateClick(arg: any ) {
    alert('date click! ' + arg.dateStr)
  }
}
