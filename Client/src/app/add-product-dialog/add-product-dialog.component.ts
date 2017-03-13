import { Component, OnInit } from '@angular/core';
import  { Product } from '../product'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  private product: Product;

  private newProductName: string;
  private newProductQuantitySold : number;
  private newProductQuantityInStock : number;
  private newProductImagePath : string;
  private newProductPrice : number;

  constructor(public activeModal: NgbActiveModal,
              private toaster: ToastrService) { }

  ngOnInit() {
  }

  onCancel(){
    this.activeModal.dismiss();
  }

  onCreate(){
    this.product.id = -1;
    this.product.name = this.newProductName;
    this.product.imagePath = this.newProductImagePath;
    this.product.quantitySold = this.newProductQuantitySold;
    this.product.price = this.newProductPrice;
    this.product.quantityInStock = this.newProductQuantityInStock;

    this.activeModal.close(this.product);
  }
}
