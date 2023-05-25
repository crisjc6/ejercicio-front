import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorId': 2025,
    'Access-Control-Allow-Origin': '*'
  });
  constructor(
    private readonly _http: HttpClient
  ) { }

  getProducts() {
    return this._http.get<any[]>(this.url, { headers: this.headers });
  }

  createProduct(body: ProductInterface) {
    return this._http.post(this.url, body, { headers: this.headers });
  }
  
  updateProduct(body: ProductInterface) {
    return this._http.put(this.url, body, { headers: this.headers });
  }

  deleteProdcut(id:string) {
    return this._http.delete(`${this.url}?id=${id}`, { headers: this.headers });
  }

  isValidProductId(productId: string) {
    return this._http.get<boolean>(`${this.url}/verification?id=${productId}`, { headers: this.headers });
  }

}
