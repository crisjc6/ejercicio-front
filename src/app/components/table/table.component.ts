import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  implements OnInit{
  @Input() products: ProductInterface[] = [];
  resultsPerPage = 5;
  maxResults = 50;

  constructor(
    private readonly productService:ProductService,
  ) {
  }
  ngOnInit(): void {
  }

  eliminarProducto(id: string) {
    this.productService.deleteProdcut(id).subscribe(data => {
      alert('Producto Eliminado')
    },error => {
      console.log(error)
      alert('No se pudo eliminar el elemento de base')
    })

  }
}
