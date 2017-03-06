import { Component, OnInit } from '@angular/core';
import { Salesperson } from '../salesperson'
import { InfoServiceService } from '../info-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  private sellers : Salesperson[];

  private newSellerName : string;
  private newSellerCategory : string;

  closeResult : string;

  constructor(private infoService : InfoServiceService, private modalService: NgbModal, private router : Router) { }

  ngOnInit() {

    /*let successHandler = (result) => {
      this.sellers = result;
    };

    let errorHandler = (err) => {
      //TODO Toastr error handling
      console.log("error " + err);
    };*/

    this.infoService.getAllSellers().subscribe(result => {
      this.sellers = result;
    });


  }

  /*addSeller(){
    const newSeller : Salesperson = {id : 0, name : this.newSellerName, category : this.newSellerCategory, image: ""};
    this.infoService.addSeller(newSeller);
  }*/

  DetailsPage(id : number){
    this.router.navigate(['details', id]);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
