import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPageComponent } from './details-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router, Route, ActivatedRoute} from "@angular/router";
import {InfoServiceService} from "../info-service.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";
import {Observable} from 'rxjs/Observable';


/**
 * it should display a modal dialog if the user tries to add a new seller
 * it should try to add a new seller if the modal dialog is closed using the OK button (spy on service.addSeller)
 * it should NOT try to add a new seller if the modal dialog is closed in any other way
 * it should add the new seller to the list if the new seller could be added
 * it should display an error message if the seller could not be added
 */

export class ActivatedRouteStub {
  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }
  private product = {
      quantitySold: 20,
      quantityInStock: 30,
      imagePath: "https://i.ytimg.com/i/-9-kyTW8ZkZNDHQJ6FgpwQ/1.jpg",
      name: "result.name",
      price: 4000,
  };
  // ActivatedRoute.snapshot.params
  get snapshot() {
    return { params: this.testParams };
  }
}

describe('DetailsPageComponent', () => {
  const activatedRoute = new ActivatedRouteStub();
  const mockService = {
    successGetSeller: true,
    sellerId : 1,
    sellerList:[{
      id : 1,
      name: "Berglind",
      category: "Annad",
      imagePath : "empty"
    }],
    getSellerbyID : function(sellerId) {
      return {
        subscribe: function(fnSuccess, fnError){
          if(mockService.successGetSeller === true){

          }
          else{
            fnError();
          }
        }
      }
    },
    getSellerProducts : function(sellerId){
      return {
        subscribe: function(fnSuccess, fnError){

        }
      }
    },
    addProduct : jasmine.createSpy("addProduct").and.returnValue(
      Observable.create((observer)=>{
         observer.onNext(this.product);
         observer.onCompleted();
      })
    ) 


  };

  const mockRouter = {
    navigate: jasmine.createSpy("navigate")
  };

  //NOT CORRECT BUT I THINK IT'S IN THE RIGHT DIRECTION
  const mockRoute = {
    snapshot: function(){
      return {
        params: function(id) {
          return 1;
        }
      }
    }
  };

  const mockToastr = {
    error: jasmine.createSpy("error"),
    info: jasmine.createSpy("info"),
    warning: jasmine.createSpy("warning")
  };

  const mockModal = {
    open: jasmine.createSpy("open").and.returnValue({
      result: Promise.resolve(this.product),
      componentInstance: { }
    })
  };

  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPageComponent ],
      providers: [{
        provide: Router,
        useValue: mockRouter
      },{
        provide: InfoServiceService,
        useValue: mockService
      },{
        provide: NgbModal,
        useValue: mockModal
      },{
        provide: ToastrService,
        useValue: mockToastr
      },{
        provide: ActivatedRoute,
        useValue: activatedRoute
      }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {
      id: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addProduct  ', () => {
    component.seller = { 
      id : 5,
      name : "peple",
      category : "Whaaa",
      imagePath : "Nei what?"
    }
    
    component.addProduct();

    //expect(component.allProducts.length).toEqual(1); //Skilar undefined
    expect(mockModal.open).toHaveBeenCalled();
    //expect(mockService.addProduct).toHaveBeenCalled();
  });

  it('should getTopTen with 112 products', () =>{

    const topTenProducts = [];
    for(let i = 0; i < 112; i++){
      topTenProducts.push({
        id: i,
        quantitySold: Math.random()*20,
        quantityInStock: Math.random()*20,
        imagePath: "http://wwww.placehold.it/200x300/",
        name: "namer" + i,
        price: Math.random()*400,
      })
    }
    component.allProducts = topTenProducts;

    component.getTopTen();

    expect(component.topTenProducts.length).toEqual(10);
    expect(component.noProducts).toBeFalsy();


  })
});

/*
 ,{
 provide: ActivatedRoute,
 useValue: mockRoute
 }
 */
