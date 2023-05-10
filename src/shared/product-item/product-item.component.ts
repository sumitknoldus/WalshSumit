import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnDestroy {
  @Input() product: any;
  @Input() trashed = false;

  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  subscriptions = new Subscription();
  constructor(private productService: ProductService,
              private router: Router,
              public dialog: MatDialog) {
  }

  openDetail(): void {
    this.router.navigate([`/detail/${this.product.id}`]);
  }

  onRestore(e: any): void {
    e?.stopPropagation();
    this.subscriptions.add(this.productService.restoreById(this.product.id)
      .subscribe(() => this.refresh.emit(true)));
  }

  onRemove(e: any): void {
    e?.stopPropagation();
    this.subscriptions.add(this.productService.removeHardById(this.product.id)
      .subscribe(() => this.refresh.emit(true)));
  }

  onDelete(e: any): void {
    e?.stopPropagation();
    this.dialog.open(DialogConfirmComponent).afterClosed().subscribe(data => {
      this.productService.removeSoftById(this.product.id)
        .subscribe(() => this.refresh.emit(data));
    });
  }

  onEdit(e: any): void {
    e?.stopPropagation();
    this.edit.emit(this.product);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

@Component({
  selector: 'dialog-confirm',
  template: `<div class="dialog-confirm">
    <div class="marginDialog">
      <h4 mat-dialog-title>Do you really want to delete this item ?</h4>
    </div>
    <span layout="row"><div style="background: grey"><hr/></div></span>
        <div mat-dialog-actions style="justify-content: flex-end" fxLayout="row">
      <button mat-button color="accent"  [mat-dialog-close]="true" tabindex="1"><mat-icon>done</mat-icon>Confirm</button>
      <button mat-button color="primary" [mat-dialog-close]="false" tabindex="2"><mat-icon>clear</mat-icon>No Thanks</button>
    </div>
  </div>`
})
export class DialogConfirmComponent {}
