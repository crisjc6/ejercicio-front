import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductInterface } from '../../interfaces/product.interface';
import { of, throwError } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let productService: ProductService;
  let control: FormControl;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [ FormComponent ],
      providers: [ProductService]
    })
    .compileComponents();
    productService = TestBed.inject(ProductService);
    control = new FormControl();
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add and edit a product success', () => {
    const product:ProductInterface =       {
      id: '',
      name: 'test',
      description: 'test',
      date_release: '',
      date_revision: '',
      logo: ''
    }
    component.product = product;
    spyOn(productService, 'updateProduct').and.returnValue(of({}));
    component.addEditProduct();
    expect(productService.updateProduct).toHaveBeenCalled();
  });

  it('should add and edit a product error', () => {
    const product:ProductInterface =       {
      id: '',
      name: 'test',
      description: 'test',
      date_release: '',
      date_revision: '',
      logo: ''
    }
    component.product = product;
    spyOn(productService, 'updateProduct').and.returnValue(throwError({}));
    component.addEditProduct();
    expect(productService.updateProduct).toHaveBeenCalled();
  });

  it('should add and create a product success', () => {
    spyOn(productService, 'createProduct').and.returnValue(of({}));
    component.addEditProduct();
    expect(productService.createProduct).toHaveBeenCalled();
  });

  it('should add and create a product error', () => {
    spyOn(productService, 'createProduct').and.returnValue(throwError({}));
    component.addEditProduct();
    expect(productService.createProduct).toHaveBeenCalled();
  });

  it('should validate id to create a product valid', () => {
    spyOn(productService, 'isValidProductId').and.returnValue(of(true));
    const validId = '001'
    component.productoForm.get('id')?.setValue(validId);
    component.validateProductId(component.productoForm.get('id') as FormControl);
    expect(component.productoForm.get('id')?.errors).toEqual(null);
  });

  it('should validate id to create a product invalid', () => {
    spyOn(productService, 'isValidProductId').and.returnValue(of(false));
    const inValidId = '00dd1'
    component.productoForm.get('id')?.setValue(inValidId);
    component.validateProductId(component.productoForm.get('id') as FormControl);
    expect(component.productoForm.get('id')?.errors).toEqual({ invalidProductId: true });
  });


  it('should is edit', () => {
    component.product = {
      id: '',
      name: 'test',
      description: 'test',
      date_release: '2023-05-24',
      date_revision: '2024-05-24',
      logo: ''
    }
    component.esEdit()
    expect(component.esEdit).toBeTruthy()
  });

  it('should call esEdit if product exists', () => {
    spyOn(component, 'esEdit');
    component.product = {
      id: '',
      name: 'test',
      description: 'test',
      date_release: '',
      date_revision: '',
      logo: ''
      };
    component.ngOnInit();
    expect(component.esEdit).toHaveBeenCalled();
  });

  it('should not call esEdit if product is undefined', () => {
    spyOn(component, 'esEdit');
    component.ngOnInit();
    expect(component.esEdit).not.toHaveBeenCalled();
  });

  it('should invalidate date release seletect', () => {
    spyOn(productService, 'isValidProductId').and.returnValue(of(false));
    const inValidDate = '2023-05-24'
    component.productoForm.get('date_release')?.setValue(inValidDate);
    const result = component.fechaMayorActual(component.productoForm.get('date_release') as FormControl);
    expect(result).toEqual({ fechaInvalida: true });
  });

  it('should validate date atual or higher', () => {
    spyOn(productService, 'isValidProductId').and.returnValue(of(false));
    const validDate = '2023-05-26'
    component.productoForm.get('date_release')?.setValue(validDate);
    const result = component.fechaMayorActual(component.productoForm.get('date_release') as FormControl);
    expect(result).toEqual(null);
  });
  
});
