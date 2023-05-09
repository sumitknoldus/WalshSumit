import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Observable } from 'rxjs';
import {ProductService} from "../../services/product.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private routeSub: any;
  product: any;

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.productService.getById(+params['id']).subscribe(data => {
        this.product = data;
      })
    });
  }


  goBack() {
    this.router.navigate(['/dashboard/home']);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
