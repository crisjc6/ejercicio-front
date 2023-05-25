import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormComponent } from '../../components/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule        
      ],
      declarations: [ AddProductComponent, FormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
