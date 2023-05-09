import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {TrashProductsComponent} from "./dashboard/trash-products/trash-products.component";

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(t => t.DashboardModule)
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard/home',
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
