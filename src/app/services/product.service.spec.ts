import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  let getProductsSpy: jasmine.Spy;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete', 'get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        
      ],
      providers: [
        ProductService,
        { provide: HttpClient, useValue: spy }
      ]
    });
    service = TestBed.inject(ProductService);
    getProductsSpy = spyOn(service, 'getProducts').and.returnValue(of([{}]));
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of products', () => {
    const expectedProducts = [{}];
    service.getProducts().subscribe((actualProducts) => {
      expect(actualProducts).toEqual(expectedProducts);
    });
    expect(getProductsSpy).toHaveBeenCalled();
  });

  
  it('should create a product', () => {
    const product: ProductInterface = { 
      name: 'test',
      description: 'test',
      logo: 'logo',
      date_release: '',
      date_revision: '',
      id: '001'
     };
    const expectedResponse = {
      name: 'test',
      description: 'test',
      logo: 'logo',
      date_release: '',
      date_revision: '',
      id: '001'
    };
    httpClientSpy.post.and.returnValue(of(expectedResponse))

    service.createProduct(product).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    expect(httpClientSpy.post).toHaveBeenCalled()
  });

  it('should update a product', () => {
    const product: ProductInterface = { 
      name: 'test',
      description: 'test',
      logo: 'logo',
      date_release: '',
      date_revision: '',
      id: '001'
     };
    const expectedResponse = {
      name: 'test',
      description: 'test',
      logo: 'logo',
      date_release: '',
      date_revision: '',
      id: '001'
    };
    httpClientSpy.put.and.returnValue(of(expectedResponse))

    service.updateProduct(product).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    expect(httpClientSpy.put).toHaveBeenCalled()
  });

  it('should delete a product', () => {
    const expectedResponse = {}
    httpClientSpy.delete.and.returnValue(of({}))

    service.deleteProdcut('001').subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    expect(httpClientSpy.delete).toHaveBeenCalled()
  });

  it('should valid  id of product', () => {
    const expectedResponse = true
    httpClientSpy.get.and.returnValue(of(true))
    service.isValidProductId('001').subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    expect(httpClientSpy.get).toHaveBeenCalled()
  });
});
