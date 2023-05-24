import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UpdateProductComponent } from './views/update-product/update-product.component';
import { AddProductComponent } from './views/add-product/add-product.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/update-product',
    component: UpdateProductComponent
  },
  {
    path: 'dashboard/add-product',
    component: AddProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
