import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogConfirmComponent, ProductItemComponent} from './product-item.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    ProductItemComponent,
    DialogConfirmComponent

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule
  ],
  exports:[
    ProductItemComponent,

  ]
})
export class ProductItemModule { }
