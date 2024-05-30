import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    const url =  `${environment.apiClinicSoft}getProducts`;

    return this.http.get(url);
  }
}
