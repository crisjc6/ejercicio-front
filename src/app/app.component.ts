import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hi'
  products: any;
  constructor( private readonly productService: ProductService ){

  }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe((res)=> {
      this.products = res;
      console.log(this.products, 'respuesta')
    });

  }
}
