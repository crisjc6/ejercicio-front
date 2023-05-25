import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listaProductos: ProductInterface[] = []
  buttonText: string = 'Agregar';
  searchValue: string = '';
  filteredItems: ProductInterface[] = [];
  constructor(
    private readonly _productService: ProductService,
  ) {

  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      (res: ProductInterface[]) => {
        this.listaProductos = res
        this.filteredItems = res
      }
    )
  }

  applyFilter() {
    this.listaProductos = this.searchValue
    ? this.listaProductos.filter(item =>
        item.name.toLowerCase().includes(this.searchValue.toLowerCase())
      )
    : this.filteredItems;
  }
}
