import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Salesperson } from './salesperson';
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

  addSeller(newSeller : Salesperson) : any {
      console.log("inside addSeller in info service");
      return this.http.post("http://localhost:5000/api/sellers", newSeller).map(
          response => { return response}); //needs to return a toastr message
  }

}
