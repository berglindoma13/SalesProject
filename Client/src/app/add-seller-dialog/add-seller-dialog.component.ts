import { Component} from '@angular/core';
import { Salesperson } from '../salesperson';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-seller-dialog',
  templateUrl: './add-seller-dialog.component.html',
  styleUrls: ['./add-seller-dialog.component.css']
})
export class AddSellerDialogComponent{
  private seller : Salesperson;

  private newSellerName: string;
  private newSellerCategory: string;
  private newSellerImage: string;

  constructor( public activeModal: NgbActiveModal,
               private toaster: ToastrService ) {
    console.log("inside add seller");
  }


  onCancel(){
    this.activeModal.dismiss();
  }

  onCreate(){
    this.seller.id = -1;
    this.seller.category = this.newSellerCategory;
    this.seller.name = this.newSellerName;
    this.seller.imagePath = this.newSellerImage;

    this.activeModal.close(this.seller);
  }
}
