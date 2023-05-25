import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let productService: ProductService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule
      ],
      declarations: [ DashboardComponent ],
      providers: [ProductService]

    })
    .compileComponents();
    productService = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getProducts Service', () => {
    const product = [{
      id: '',
      name: 'test',
      description: 'test',
      date_release: '',
      date_revision: ''
    }]
    spyOn(productService, 'getProducts').and.returnValue(of(product));
    component.getProducts();
    expect(productService.getProducts).toHaveBeenCalled();
  });

  it('should applyFilter to filter product Search', () => {
    component.listaProductos = [
      {
        id: '',
        name: 'test',
        description: 'test',
        date_release: '',
        date_revision: '',
        logo: ''
      }
    ]
    component.searchValue= 'test'
    component.applyFilter();
    expect(component.applyFilter).toBeTruthy();
  });

  it('should applyFilter to filter product Search  no value', () => {
    component.searchValue= ''
    component.applyFilter();
    expect(component.applyFilter).toBeTruthy();
  });

});
