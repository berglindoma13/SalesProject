import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPageComponent } from './details-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router, Route, ActivatedRoute} from "@angular/router";
import {InfoServiceService} from "../info-service.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";


/**
 * it should display a modal dialog if the user tries to add a new seller
 * it should try to add a new seller if the modal dialog is closed using the OK button (spy on service.addSeller)
 * it should NOT try to add a new seller if the modal dialog is closed in any other way
 * it should add the new seller to the list if the new seller could be added
 * it should display an error message if the seller could not be added
 */
describe('DetailsPageComponent', () => {

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
    }
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
    open: jasmine.createSpy("open")
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
        provide: ActivatedRoute,
        useValue: mockRoute
      },{
        provide: InfoServiceService,
        useValue: mockService
      },{
        provide: NgbModal,
        useValue: mockModal
      },{
        provide: ToastrService,
        useValue: mockToastr
      }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
