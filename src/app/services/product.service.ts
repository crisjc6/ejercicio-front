  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    constructor(
      private readonly _http: HttpClient
    ) { }

    getProducts(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorId': 2019,
        'Access-Control-Allow-Origin': '*'
      });
      return this._http.get<any[]>('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products', {headers});
    }
    
  }
