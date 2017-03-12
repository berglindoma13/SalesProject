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

  constructor( public activeModal: NgbActiveModal,
               private toaster: ToastrService ) {
    console.log("inside add seller");
    this.removethis();
  }


  onCancel(){
    this.activeModal.dismiss();
  }

  onCreate(){
    this.activeModal.close(this.seller);
  }

  removethis(){
    this.toaster.error('<img src="http://cdn3.gurl.com/wp-content/uploads/2017/02/white-guy-blinking-gif.gif"></img>',"This shite!");
  }
}
