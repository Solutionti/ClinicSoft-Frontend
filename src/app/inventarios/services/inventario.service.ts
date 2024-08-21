import { HttpClient, HttpParams } from '@angular/common/http';
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

  getInventories(cantidad: any, signo: any) {
    const url =  `${environment.apiClinicSoft}getInventories`;
    let params = new HttpParams().set("cantidad", cantidad)
                                 .set("signo", signo);
    return this.http.get(url, { params });
  }

  getKardex(producto: any, fechainicial: any, fechafinal: any) {
    const url =  `${environment.apiClinicSoft}getKardex`;
    let params = new HttpParams().set("producto", producto)
                                 .set("fechainicial", fechainicial)
                                 .set("fechafinal", fechafinal);
    return this.http.get(url, { params });
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

// kardex

  Creatstart(datos: any) {
    const url = `${environment.apiClinicSoft}creatStart`;

    return this.http.post(url, {
      producto: datos[0].producto,
      cantidad: datos[0].cantidad,
      stock: datos[0].stock,
      seccion: datos[0].seccion,
      comentarios: datos[0].comentarios,
      usuario: datos[0].usuario,
      motivo: datos[0].motivo
    });
  }

  createEnd(datos: any) {
    const url = `${environment.apiClinicSoft}createEnd`;

    return this.http.post(url, {
      producto: datos[0].producto,
      cantidad: datos[0].cantidad,
      stock: datos[0].stock,
      seccion: datos[0].seccion,
      comentarios: datos[0].comentarios,
      usuario: datos[0].usuario,
      motivo: datos[0].motivo
    });
  }
}
