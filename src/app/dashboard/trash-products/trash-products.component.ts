import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-trash-products',
  templateUrl: './trash-products.component.html',
  styleUrls: ['./trash-products.component.scss']
})
export class TrashProductsComponent implements OnInit, OnDestroy{
  private _router: Router;

  products: any[] = [];
  subscriptions = new Subscription();
  constructor(router: Router,
              private productService: ProductService) {
    this._router = router;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.subscriptions.add(this.productService.getAllProducts({removed: true})
      .subscribe(products => {
        this.products = products || [];
        //console.log('products ares: ', this.products);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
