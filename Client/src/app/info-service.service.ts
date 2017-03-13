import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Salesperson } from './salesperson';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import "rxjs/rx";

@Injectable()
export class InfoServiceService {

  constructor(private http: Http) { }


  getAllSellers() : Observable<Salesperson[]> {
    return this.http.get("http://localhost:5000/api/sellers")
        .map(response => {
          return <Salesperson[]> response.json();
        });
  }

  getSellerbyID(id : number): Observable<Salesperson> {
      return this.http.get(`http://localhost:5000/api/sellers/${id}`).map(response => {
          return <Salesperson> response.json();
      })
  }

  addSeller(newSeller : Salesperson) : Observable<Salesperson> {
      return this.http.post("http://localhost:5000/api/sellers", newSeller).map(
          response => {
              return <Salesperson> response.json()
          });
  }

  addProduct(newProduct : Product, sellerId : number) : Observable <Product> {
      return this.http.post(`http://localhost:5000/api/sellers/${sellerId}/products`, newProduct).map(response => {
          return <Product> response.json()
      });
  }

  getSellerProducts(id : number) : Observable<Product[]> {
      return this.http.get(`http://localhost:5000/api/sellers/${id}/products`).map( response => {
          return <Product[]> response.json();
      });
  }

  editSeller(editedSeller : Salesperson) : Observable<Salesperson> {
      return this.http.put(`http://localhost:5000/api/sellers/${editedSeller.id}`, editedSeller).map( response => {
          return <Salesperson> response.json();
      });
  }

  editProduct(sellerId : number, editedProduct : Product) : Observable <Product> {
      return this.http.put(`http://localhost:5000/api/sellers/${sellerId}/products/${editedProduct.id}`, editedProduct).map( response => {
            return <Product> response.json();
      });
  }

  testingUnitTests(){
    return 1;
  }

}
