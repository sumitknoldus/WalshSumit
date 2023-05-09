import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-trash-products',
  templateUrl: './trash-products.component.html',
  styleUrls: ['./trash-products.component.scss']
})
export class TrashProductsComponent {
  private _router: Router;

  products: any[] = [];
  constructor(router: Router,
              private productService: ProductService) {
    this._router = router;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts({removed: true})
      .subscribe(products => {
        this.products = products || [];
        console.log('products ares: ', this.products);
      });
  }
}
