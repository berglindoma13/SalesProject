import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Salesperson } from './salesperson';
import { Observable } from 'rxjs/Observable';
import "rxjs/rx";

@Injectable()
export class InfoServiceService {

  constructor(private http: Http) { }


  getSpecificSalesPerson(id : number){
    var tmp;
    tmp = this.http.get("http://localhost:5000/api/sellers/${id}");
  }

}
