import { Component, OnInit } from '@angular/core';
import { Salesperson } from '../salesperson';
import { InfoServiceService } from '../info-service.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
import { AddSellerDialogComponent } from '../add-seller-dialog/add-seller-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  private sellers : Salesperson[];
  closeResult : string;

  constructor(private infoService : InfoServiceService,
              private modalService: NgbModal,
              private toaster: ToastrService,
              private router : Router) {
  }

  ngOnInit() {
    this.infoService.getAllSellers().subscribe(result => {
        this.sellers = result;
      },
      err => {
        this.displayError("Could not get sellers","Error");
      });
  }

  DetailsPage(id : number){
    this.router.navigate(['details', id]);
  }

  addSeller(){
    console.log("opening add seller module");
    const instance = this.modalService.open(AddSellerDialogComponent);
    instance.componentInstance.seller = {};
    instance.result.then(result => {
      console.log("dialog closed with OK");
      const newSeller = {
        id : this.sellers.length + 1,
        name : result.name,
        category: result.category,
        imagePath: result.imagePath
      };
      this.infoService.addSeller(newSeller).subscribe(result => {
        console.log("adding successful");
      }, err => {
        console.log("Dialog was cancelled");
      })

    })
  }

  displayError(message,error) {
    this.toaster.error(message, error);
  }

}
