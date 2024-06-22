import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  constructor(
    private http: HttpClient
  ) { }

  getPayments(){
    const url =  `${environment.apiClinicSoft}getPayments`;

    return this.http.get(url);
  }

  
}
