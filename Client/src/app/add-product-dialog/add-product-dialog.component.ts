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

  constructor(public activeModal: NgbActiveModal,
              private toaster: ToastrService) { }

  ngOnInit() {
  }

  onCancel(){
    this.activeModal.dismiss();
  }

  onCreate(){
    this.activeModal.close(this.product);
  }
}
