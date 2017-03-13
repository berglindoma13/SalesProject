import {Component, OnInit, NgModule} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Salesperson} from '../salesperson';
import {Product} from '../product';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InfoServiceService} from '../info-service.service';
import {FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component'

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
              private modalService: NgbModal,
              private toastr: ToastrService) {
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
      this.getTopTen();
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
    }
    this.topTenProducts.sort(this.compare);
    this.topTenProducts = this.topTenProducts.slice(0, 10);

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

  addProduct(){
    const instance = this.modalService.open(AddProductDialogComponent);
    instance.componentInstance.newProduct = {};
    instance.result.then(result => {
      console.log(result);
      const newProduct = {
        id : this.seller.id + 1,
        quantitySold: result.quantitySold,
        quantityInStock: result.quantityInStock,
        imagePath: result.imagePath,
        name: result.name,
        price: result.price,
      };
      this.infoService.addProduct(newProduct, this.newProduct.id).subscribe(result => {
        console.log("adding successful");
      }, err => {
        console.log("Dialog was cancelled");
      })

    })
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
