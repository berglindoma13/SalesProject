import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoServiceService } from '../info-service.service';
import { MainPageComponent } from './main-page.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


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
      getAllSellers: function() {
          return {
              subscribe: function(fnSuccess, fnError){
                  if(mockService.successGetSellers === true){
                    fnSuccess(mockService.sellerList);
                  }
                  else{
                      fnError();
                  }
              }
          }
      },
      addSeller: function() {
        return {
          subscribe: function(fnSuccess, fnError){
            if(mockService.successAddSellers === true){
              fnSuccess(mockService.AddedSeller);
            }
            else{
              fnError();
            }
          }
        }
      }

  };

  const mockModal = {
    pressedOK : true,
    open: function(){
      return {
        result: {
          then: function(fnSuccess, fnError){
            if(mockModal.pressedOK === true){
              fnSuccess();
            }
            else{
              fnError();
            }
          }
        }
      }
    }
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

  describe("When info server returns a list", () => {
    mockService.successGetSellers = true;
    mockService.sellerList = [];

    it("it should display a list of sellers if the backend returns a list", ()=>{
      mockService.getAllSellers();
      //NOT DONE
      //EXPECT SOMETHING
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe("when info service returns empty list of sellers", () =>{
      mockService.successGetSellers = false;
      mockService.sellerList = [];

      it("should display a message indicating that no products are to be displayed", () => {
          mockService.getAllSellers();
          //NOT DONE
        //EXPECT SOMETHING
      });
  })

  describe("opening a modal", () => {
    //NOT DONE
  })

  describe("Adding a new seller", () => {
    mockService.successAddSellers = true;
    mockService.addSeller();
    //NOT DONE
    //EXPECT SOMETHING
  });
});
