import { Component} from '@angular/core';
import { Salesperson } from '../salesperson';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-seller-dialog',
  templateUrl: './add-seller-dialog.component.html',
  styleUrls: ['./add-seller-dialog.component.css']
})
export class AddSellerDialogComponent{
  private seller : Salesperson;

  constructor( public activeModal: NgbActiveModal) {
    console.log("inside add seller");
  }


  onCancel(){
    this.activeModal.dismiss();
  }

  onCreate(){
    this.activeModal.close(this.seller);
  }
}
