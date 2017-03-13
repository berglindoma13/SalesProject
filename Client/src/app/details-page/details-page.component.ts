import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Salesperson} from '../salesperson';
import {Product} from '../product';
import {InfoServiceService} from '../info-service.service';
import {FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  sellerId: number;
  seller: Salesperson;
  allProducts: Product[];
  topTenProducts: Product[];

  newProduct: Product;

  private addProductForm = this.fb.group({
    id: [0],
    quantitySold: [0],
    quantityInStock: [0],
    imagePath: [""],
    name: [""],
    price: []
  });


  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private infoService: InfoServiceService,
              private toastr: ToastrService) {
    this.topTenProducts = [];
  }

  ngOnInit() {
    this.sellerId = this.route.snapshot.params['id'];

    this.infoService.getSellerbyID(this.sellerId).subscribe(result => {
      this.seller = result;
    },
    err => {
      this.displayError("Could not get seller by id","Error");
    });

    this.infoService.getSellerProducts(this.sellerId).subscribe(result => {
      this.allProducts = result;
    },
    err => {
      this.displayWarning("this Seller has no products","Warning");
      this.router.navigate(['main']);

    });
  }

  getTopTen() {
    this.topTenProducts = [];
    for (const i in this.allProducts) {
      this.topTenProducts.push(this.allProducts[i]);
      this.topTenProducts.sort(this.compare);
      this.topTenProducts = this.topTenProducts.slice(0, 10);
    }
    if(this.topTenProducts.length == 0){
      this.displayInfo("This seller has no top ten products", "Sorry")
    }
  }

  compare(a: Product, b: Product) {
    if (a.quantitySold < b.quantitySold) {
      return -1;
    }
    if (a.quantitySold > b.quantitySold) {
      return 1;
    }
    return 0;

  }

  onNewProduct(event) {
    this.newProduct = this.addProductForm.value;
    this.infoService.addProduct(this.newProduct, this.sellerId).subscribe(result => {
      this.allProducts.push(result);
    });
    this.getTopTen();
  }

  displayError(message, error){
    this.toastr.error(message,error);
  }

  displayWarning(message, error){
    this.toastr.warning(message,error);
  }


  displayInfo(message,error){
    this.toastr.info(message,error);
  }

}
