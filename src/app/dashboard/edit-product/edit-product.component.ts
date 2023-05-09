import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  form: FormGroup;
  productId: any;
  product: any;
  isAdd: boolean = false;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditProductComponent>,
              private productService: ProductService,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.form = this.initForm();
    this.productId = data.productId;
    this.isAdd = this.productId === 0;
  }

  ngOnInit() {
    if (!this.isAdd) {
      this.getProductData();
    }
  }

  getProductData(): void {
    this.productService.getById(this.productId)
      .subscribe(product => {
        this.product = product;
        this.form.patchValue(this.product);
      });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.max(50)]],
      color: ['', [Validators.required]],
      company: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.min(150)]],
      imageURL: ['', [Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg))$/)]],
      price: ['', [Validators.required]],
      availability: [true, [Validators.required]],
    });
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.productService.create(this.form.value)
      .subscribe((products) => this.dialogRef.close(products));
  }
}
