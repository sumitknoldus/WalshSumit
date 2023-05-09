import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "@angular/cdk/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {DashboardComponent} from "./dashboard.component";
import {TrashProductsComponent} from "./trash-products/trash-products.component";
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {ProductItemModule} from "../../shared/product-item/product-item.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";

const routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'trash-products',
        component: TrashProductsComponent
      },
      {
        path: 'edit/:id',
        component: EditProductComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    TrashProductsComponent,
    HomeComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ProductItemModule,
  ]
})
export class DashboardModule { }
