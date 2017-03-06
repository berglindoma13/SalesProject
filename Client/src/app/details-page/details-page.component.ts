import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { Salesperson } from '../salesperson';
import { Product } from '../product';
import { InfoServiceService } from '../info-service.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  sellerId : number;
  seller : Salesperson;
  allProducts : Product[];
  topTenProducts : Product[];


  constructor(private router : Router, private route : ActivatedRoute, private infoService : InfoServiceService) { }

  ngOnInit() {
    this.sellerId = this.route.snapshot.params['id'];

    this.infoService.getSellerbyID(this.sellerId).subscribe(result => {
        this.seller = result;
        console.log(this.seller);
    });

    this.infoService.getSellerProducts(this.sellerId).subscribe(result => {
        this.allProducts = result;
    });
  }

  getTopTen(){
      for(let i in this.allProducts){
          
      }
  }

}
