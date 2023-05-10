import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {debounceTime, Subscription, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EditProductComponent} from "../edit-product/edit-product.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchCtrl = new FormControl('');
  availabilityCtrl = new FormControl('');
  //companyCtrl = new FormControl('');
  companyCtrl = this._formBuilder.group({
    Apple: false,
    Samsung: false,
    Xiaomi: false,
    OnePlus: false,
    Lava: false,
    Google: false,
    Micromax: false,
  });
  products: any[] = [];
  filters: any = {removed: false};
  availabilityOptions = [
    {label: 'In Stock', value: true},
    {label: 'Out Of Stock', value: false}
  ];
  subscriptions = new Subscription();

  constructor(router: Router,
              private dialog: MatDialog,
              private productService: ProductService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getProducts(this.filters);
    this.subscriptions.add(this.searchCtrl.valueChanges.subscribe(t => {
      this.filters.search = t;
      this.getProducts(this.filters);
    }));

    this.subscriptions.add(this.availabilityCtrl.valueChanges.subscribe(t => {
      this.filters.availability = t;
      this.getProducts(this.filters);
    }));

    this.subscriptions.add(this.companyCtrl.valueChanges.subscribe((t: any) => {
      let categoryFilter: string[] = [];
      for (let key in t) {
        if (t[key]) {
          categoryFilter.push(key);
        }
      }
      // console.log(categoryFilter);
      this.filters.company = categoryFilter;
      this.getProducts(this.filters);
    }));
  }

  getProducts(filters?: any): void {
    this.subscriptions.add(this.productService.getAllProducts(filters)
      .subscribe(products => {
        // this.companyCtrl.reset();
        this.products = products || [];
        console.log('products ares: ', this.products);
      }));
  }

  onClearSearch(): void {
    this.searchCtrl.patchValue('');
  }

  onChange(data: any) {
    // this.availabilityCtrl.reset();
    // @ts-ignore
    const arr = this.companyCtrl.getRawValue() as any;


    let categoryFilter: string[] = [];
    for (let key in arr) {
      if (arr[key]) {
        categoryFilter.push(key);
      }
    }
    // console.log(categoryFilter);
    this.filters.company = categoryFilter;
    this.getProducts(this.filters);
    // this.productService.getAllProducts(this.filters).subscribe(data => {
    //   // this.products = data.filter((x: { company: string; }) => categoryFilter.indexOf(x.company) !== -1);
    //   // this.products = this.products.length === 0 ? data : this.products;
    // })

  }

  openEditProduct(productId: number): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '50vw',
      // height: '50vh',
      data: {
        productId,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.getProducts(this.filters); // update the product list.
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
