import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductInterface } from '../../interfaces/product.interface';
import { Observable, map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() product: ProductInterface | undefined; 
  productoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private readonly productService: ProductService,
    private router: Router
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    this.productoForm.get('date_release')?.valueChanges.subscribe(value => {
      this.calculateFechaFinal();
    });
    if(this.product){
      this.esEdit();
    }
  }


  createForm() {
    const fechaActual = new Date();
    const fechaInicialPredeterminada = new Date(fechaActual.getTime() - 24 * 60 * 60 * 1000);
    this.productoForm = this.fb.group(
      {
        id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], this.validateProductId.bind(this)],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        date_release: [fechaInicialPredeterminada.toISOString().substring(0, 10), [Validators.required, this.fechaMayorActual]],
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        logo: ['', Validators.required],
        date_revision: [{ value: this.calculateFechaFinal() , disabled: true }, Validators.required],
      }
    )
  }
  addEditProduct() {
    const product: ProductInterface  = {
      id: this.productoForm.get('id')?.value,
      description: this.productoForm.get('description')?.value,
      date_release: this.productoForm.get('date_release')?.value,
      name: this.productoForm.get('name')?.value,
      logo: this.productoForm.get('logo')?.value,
      date_revision: this.productoForm.get('date_revision')?.value

    }
    if(this.product){
      this.productService.updateProduct(product).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
        alert('No se pudo actualizar el producto en la base de datos');
      })
    }else {
      this.productService.createProduct(product).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
        alert('No se pudo crear el producto en la base de datos');
      })
      
    }
  }


  calculateFechaFinal() {
    let fechaInicial = this.productoForm.get('date_release')?.value ? this.productoForm.get('date_release')?.value : (new Date().getTime() - 24 * 60 * 60 * 1000);
    const fechaFinal = new Date(fechaInicial);
    fechaFinal.setFullYear(fechaFinal.getFullYear() + 1);
    this.productoForm.get('date_revision')?.setValue(fechaFinal.toISOString().substring(0, 10));
    return fechaFinal.toISOString().substring(0, 10);
  }

  esEdit(){
    this.productoForm.setValue({
      id: this.product?.id,
      description: this.product?.description,
      name: this.product?.name,
      logo: this.product?.logo,
      date_release: new Date(this.product? this.product.date_release: '').toISOString().substring(0, 10),
      date_revision: new Date(this.product? this.product.date_revision: '').toISOString().substring(0, 10),
      
    })
    this.productoForm.get('id')?.disable()
  }

  validateProductId(control: FormControl): Observable<ValidationErrors | null> {
    const productId = control.value;
    return this.productService.isValidProductId(productId).pipe(
      map(isValid => {
        if (isValid) {
          return null;
        } else {
          return { invalidProductId: true };
        }
      })
    );
  }

  fechaMayorActual(control: FormControl): ValidationErrors | null {
    const fechaSeleccionada = new Date(control.value);
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);
    if (fechaSeleccionada >= fechaActual) {
      return null; 
    } else {
      return { fechaInvalida: true }; 
    }
  }
}

