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

  getInventories(cantidad: any) {
    const url =  `${environment.apiClinicSoft}getInventories`;
    let params = new HttpParams().set("cantidad", cantidad);
    return this.http.get(url, { params });
  }

  getKardex(producto: any ) {
    const url =  `${environment.apiClinicSoft}getKardex`;
    let params = new HttpParams().set("producto", producto);
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
    const url = `${environment.apiClinicSoft}Creatstart`;

    return this.http.post(url, {
      id_producto: datos[0].id_producto,
      tp_documento: datos[0].tp_documento,
      entrada: datos[0].entrada,
      salida: datos[0].salida,
      devolucion: datos[0].devolucion,
      fecha: datos[0].fecha,
      hora: datos[0].hora,
      descripcion: datos[0].descripcion,
      usuario: datos[0].usuario,
      sede: datos[0].sede,
      motivo: datos[0].motivo,
      saldo: datos[0].saldo
    });
  }
}
