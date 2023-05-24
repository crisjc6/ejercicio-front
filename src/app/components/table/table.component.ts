import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  implements OnInit{
  @Input() products: ProductInterface[] = [];
  buttonText: string = 'Agregar';
  resultsPerPage = 5;
  maxResults = 50;
  filteredItems: ProductInterface[] = [];
  searchValue: string = '';

  constructor() {
  }
  ngOnInit(): void {
    this.filteredItems = this.products
  }
  
  applyFilter() {
    this.products = this.searchValue
    ? this.products.filter(item =>
        item.name.toLowerCase().includes(this.searchValue.toLowerCase())
      )
    : this.filteredItems;
  }

}
