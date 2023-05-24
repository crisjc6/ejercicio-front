import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  listaProductos: ProductInterface[] = []
  constructor(
    private readonly _productService: ProductService,
  ) {

  }
  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      (res: ProductInterface[])=> {
        this.listaProductos = res
      }
    )
  }
}
