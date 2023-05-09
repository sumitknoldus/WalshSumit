import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MatCardModule} from "@angular/material/card";
import {ProductService} from "../services/product.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";

function initializeDataFactory(productService: ProductService): () => Observable<any> {
  return () => productService.loadProducts();
}

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDataFactory,
      multi: true,
      deps: [ProductService, HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
