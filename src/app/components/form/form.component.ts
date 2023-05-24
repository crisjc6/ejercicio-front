import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  productoForm: FormGroup = new FormGroup({});;

  constructor(
    private fb: FormBuilder,
  ){
  }
  
  ngOnInit(): void {
    this.productoForm = this.fb.group(
      {
        id: ['',Validators.required],
        description: ['',Validators.required],
        date_release: ['',Validators.required],
        name: ['',Validators.required],
        logo: ['',Validators.required],
        date_revision: ['',Validators.required],
      }
    )
  }


  addEditProduct(){
    console.log(this.productoForm)
  }
}
