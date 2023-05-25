import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductComponent } from './update-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let productService: ProductService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ UpdateProductComponent ],
      providers: [ProductService]
    })
    .compileComponents();
    productService = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter a product with getProducts Service', () => {
    const product = [{
      id: 1,
      name: 'test',
      description: 'test',
      date_release: '',
      date_revision: ''
    }]
    spyOn(productService, 'getProducts').and.returnValue(of(product));
    component.getProductId();
    expect(productService.getProducts).toHaveBeenCalled();
  });
});
