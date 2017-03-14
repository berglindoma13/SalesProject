import {Component, OnInit, NgModule} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Salesperson} from '../salesperson';
import {Product} from '../product';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InfoServiceService} from '../info-service.service';
import {FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component'
import {AddSellerDialogComponent} from "../add-seller-dialog/add-seller-dialog.component";

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

  noProducts : boolean;

  constructor(private router: Router,
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
      this.noProducts = false;
    }
    this.topTenProducts.sort(this.compare);
    this.topTenProducts = this.topTenProducts.slice(0, 10);

    if(this.topTenProducts.length == 0){
      //this.displayInfo("This seller has no top ten products", "Sorry")
      this.noProducts = true;
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
    instance.componentInstance.product = {};
    instance.result.then(result => {
      const newProduct = {
        id : this.seller.id + 1,
        quantitySold: result.quantitySold,
        quantityInStock: result.quantityInStock,
        imagePath: result.imagePath,
        name: result.name,
        price: result.price,
      };
      this.infoService.addProduct(newProduct, this.sellerId).subscribe(result => {
        this.allProducts.push(result);
        this.displaySuccess("Product was successfully added", "Success");
      }, err => {
        this.displayError("Product could not be added", err);
      })
    })
    .catch((error)=>{
      
    });
    this.getTopTen();
  }

  editSeller(){
    const instance = this.modalService.open(AddSellerDialogComponent);
    instance.componentInstance.seller = {};
    instance.componentInstance.edit = true;
    instance.result.then(result => {
      const editedSeller = {
        id : this.sellerId,
        name : result.name,
        category: result.category,
        imagePath: result.imagePath
      };
      this.infoService.editSeller(editedSeller).subscribe(result => {
        this.seller = result;
      });
    })
    .catch((error)=>{
      
    });
  }

  editProduct(product: Product){
    const instance = this.modalService.open(AddProductDialogComponent);
    //Sendir inn gögnin á 
    instance.componentInstance.product = {
      id: product.id,
      quantitySold: product.quantitySold,
      quantityInStock: product.quantityInStock,
      imagePath: product.imagePath,
      name: product.name,
      price: product.price
    };
    instance.componentInstance.edit = true;
    instance.result.then(result => {
      const editedProduct = {
        id : product.id,
        quantitySold: result.quantitySold,
        quantityInStock: result.quantityInStock,
        imagePath: result.imagePath,
        name: result.name,
        price: result.price,
      };
      this.infoService.editProduct(this.sellerId, editedProduct).subscribe(result => {
        console.log(result);
        product.name = result.product.name;
        product.quantityInStock =result.product.quantityInStock;
        product.quantitySold = result.product.quantitySold;
        product.imagePath = result.product.imagePath;
        product.price = result.product.price;
      })
    })
    .catch((error)=>{
    });
  }

  displayError(message, error){
    this.toastr.error(message,error);
  }

  displayWarning(message, error){
    this.toastr.warning(message,error);
  }

  displaySuccess(message,success){
    this.toastr.success(message,success);
  }

}
