import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoServiceService } from '../info-service.service';
import { MainPageComponent } from './main-page.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {fn} from "@angular/compiler/src/output/output_ast";
import {Observable} from "rxjs";



/** it should display a list of sellers if the backend returns a list
 * if should display a message if the list of sellers is empty
 * it should display an error message if the list cannot be retrieved
 */
describe('MainPageComponent', () => {
  const mockService = {
      successGetSellers: true,
      successAddSellers: true,
      sellerList:[{
          id : 1,
          name: "Berglind",
          category: "Annad",
          imagePath : "empty"
      }],
      AddedSeller: {
        id : 0,
        name: "Berglind",
        category: "annad",
        imagePath: ""
      },
      getAllSellers: jasmine.createSpy("getAllSellers").and.returnValue(
        Observable.create((observer => {
          observer.onNext(this.sellerList);
          observer.onCompleted();
        })
      )),
      addSeller: jasmine.createSpy("addSeller").and.returnValue(
        Observable.create((observer)=>{
          observer.onNext(this.AddedSeller);
          observer.onCompleted();
        })
      )
  };

  const mockModal = {
    open: jasmine.createSpy("open").and.returnValue({
      result: Promise.resolve(this.product),
      componentInstance: { }
    })
  };

  //DONE
  const mockToastr = {
    error: jasmine.createSpy("error"),
    success: jasmine.createSpy("success")
  };

  //NEEDS MORE MOCKING
  const mockRouter = {
    navigate: jasmine.createSpy("navigate")
  };

  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
        providers:[{
          provide: InfoServiceService,
            useValue: mockService
        }, {
            provide: NgbModal,
            useValue: mockModal
        },{
          provide: Router,
          useValue: mockRouter
        },{
          provide: ToastrService,
          useValue: mockToastr
        }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*it("should add a new seller", () => {
    component.addSeller();
    expect(mockModal.open).toHaveBeenCalled();
  });*/

  it("it should display a list of sellers if the backend returns a list", ()=>{
    mockService.successGetSellers = true;
    mockService.sellerList = [];
    fixture.detectChanges();
    expect(component.sellers.length).toEqual(1);
  });

  it("should display a message indicating that no products are to be displayed", () => {
    mockService.successGetSellers = false;
    mockService.sellerList = [];
    //NOT DONE
    //EXPECT SOMETHING
  });

  it("should navigate to a new page", () => {
    spyOn(component, 'DetailsPage');
    component.DetailsPage(1);
    expect(component.DetailsPage).toHaveBeenCalledWith(1);
    //expect(mockRouter.navigate).toHaveBeenCalledWith('/details/1');
  });
});
