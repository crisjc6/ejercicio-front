import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './views/update-product/update-product.component';
import { AddProductComponent } from './views/add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormComponent,
    TableComponent,
    UpdateProductComponent,
    AddProductComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
