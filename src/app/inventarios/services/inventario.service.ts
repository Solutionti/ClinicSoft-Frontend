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

  // CREACION DEL SERVICIO DE CREAR EL PRODUCTO 
  createProduct(datos: any) {
    const url = `${environment.apiClinicSoft}createProduct`;

    return this.http.post(url, {
      categoria: datos[0].categoria,
      nombre: datos[0].nombre,
      codigo: datos[0].codigo,
      barras: datos[0].barras,
      medida: datos[0].medida,
      cantidad: datos[0].cantidad,
      precio_u: datos[0].precio_u,
      moneda: datos[0].moneda,
      descripcion: datos[0].descripcion,
      usuario: datos[0].usuario,
    });
  }
}
