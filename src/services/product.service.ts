import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, filter, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // products: any[] = [];
  private products$ = new BehaviorSubject<any[]>([]);

  constructor(private httpClient: HttpClient) { }

  loadProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/json/products.json')
      .pipe(
        tap(t => this.products$.next(t))
      )
  }

  create(data: any): Observable<any> {
    const products = this.products$.getValue();
    // const latestId = products.reduce((acc, cur) => {
    //   cur = acc.id > 0 ? acc.id : cur;
    // }, 0);
    data.id = products.length + 1;
    products.push(data);
    this.products$.next([...products]);
    return this.products$.asObservable();
  }

  getById(productId: any): Observable<any> {
    const products = this.products$.getValue();
    const product = products.find(t => t.id === productId);
    return of(product);
  }

  getAllProducts(filters = {} as any): Observable<any> {
    let products = this.products$.getValue();
    if (!filters.removed) {
      products = products.filter(t => !t.remove);
    }
    if (filters.removed) {
      products = products.filter(t => t.remove);
    }

    if(filters.search?.length) {
      products = products.filter(t => JSON.stringify(t)?.toLowerCase().includes(filters.search?.toLowerCase()));
    }

    if(filters.availability != null) {
      products = products.filter(t => t.availability === filters.availability);
    }

    if (filters.company?.length) {
      products = products.filter(t => filters.company.includes(t?.company));
    }

    return of(products);
  }

  removeSoftById(productId: number): Observable<any> {
    const products = this.products$.getValue();
    const productIndex = products.findIndex(t => t.id === productId);
    const product = products[productIndex];
    product.remove = true;
    this.products$.next([...products]);
    return this.products$.asObservable();
  }

  restoreById(productId: number): Observable<any> {
    const products = this.products$.getValue();
    const productIndex = products.findIndex(t => t.id === productId);
    const product = products[productIndex];
    product.remove = false;
    this.products$.next([...products]);
    return this.products$.asObservable();
  }

  removeHardById(productId: number): Observable<any> {
    const products = this.products$.getValue();
    const productIndex = products.findIndex(t => t.id === productId);
    products.splice(productIndex, 1);
    this.products$.next([...products]);
    return this.products$.asObservable();
  }


}
