import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigiturnoService {
  public miVariable$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  getTurnos() {
    const url =  `${environment.apiClinicSoft}getTurnos`;

    return this.http.get(url);
  }

  getTurnoId() {
    const url =  `${environment.apiClinicSoft}getTurnoId`;

    return this.http.get(url);
  }

  ActualizarTurnoPasar(estado: any ) {
    const url =  `${environment.apiClinicSoft}ActualizarTurnoPasar`;

    return this.http.post(url, {
      estado: estado 
    });
  }

  
}
