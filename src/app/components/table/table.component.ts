import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  buttonText: string = 'Agregar';
  resultsPerPage = 5;
  maxResults = 50;
  @Input() products: ProductInterface[] = [];

  onClick(){
    console.log('click');
  }

}
