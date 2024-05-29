import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(
    private http: HttpClient
  ) { }

  getSex() {
    return this.http.get(environment.apiClinicSoft + 'getSex');
  }

  getDepartaments() {
    return this.http.get(environment.apiClinicSoft + 'getDepartaments');
  }

  getAcademics() {
    return this.http.get(environment.apiClinicSoft + 'getAcademics');
  }

  getCivilStatus() {
    return this.http.get(environment.apiClinicSoft + 'getCivilStatus');
  }

  getDoctor() {
    return this.http.get(environment.apiClinicSoft + 'getDoctor');
  }

  getSpecialties(){
    return this.http.get(environment.apiClinicSoft + 'getSpecialties');
  }

  getProvince(departamento: any ) {
    let params = new HttpParams().set("departamento", departamento);
    
    return this.http.get(environment.apiClinicSoft + 'getProvince', { params });
  }

  getDistrict(departamento: any, provincia: any  ) {
    let params = new HttpParams().set("departamento", departamento)
                                 .set("provincia", provincia);

    return this.http.get(environment.apiClinicSoft + 'getProvince', { params });
  }

  getCategories() {
    return this.http.get(environment.apiClinicSoft + 'categories');
  }

}
