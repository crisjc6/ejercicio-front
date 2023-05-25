import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ TableComponent ],
      providers: [ProductService]
    })
    .compileComponents();
    productService = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a product', () => {
    const productId = '001';
    spyOn(productService, 'deleteProdcut').and.returnValue(of({ success: true }));
    component.eliminarProducto(productId);
    expect(productService.deleteProdcut).toHaveBeenCalledWith(productId);
  });

  it('shouldn?t delete a product', () => {
    const productId = '01';
    spyOn(productService, 'deleteProdcut').and.returnValue(throwError({}));
    component.eliminarProducto(productId);
    expect(productService.deleteProdcut).toHaveBeenCalledWith(productId);
  });
});
