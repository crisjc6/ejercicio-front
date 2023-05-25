import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  id:string | null = '';
  product: ProductInterface | undefined;
  constructor(
    private aRouter: ActivatedRoute,
    private readonly productService: ProductService,
  ){
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getProductId();
  }
  
  getProductId(){
    this.productService.getProducts().subscribe((data: ProductInterface[]) => {
      this.product = data.find((item: ProductInterface) => item.id === this.id);
    })
  }

}
