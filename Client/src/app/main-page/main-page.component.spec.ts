import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoServiceService } from '../info-service.service';
import { MainPageComponent } from './main-page.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

describe('MainPageComponent', () => {
  const mockService = {
      successGetSellers: true,
      sellerList:[{
          id : 1,
          name: "Berglind",
          category: "Annad",
          imagePath : "empty"
      }],
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
      }

  };

  const mockModal = {
        open: jasmine.createSpy("open")
  }

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
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("when info service returns empty list of sellers", () =>{
      mockService.successGetSellers = true;
      mockService.sellerList = [];

      it("should display a message indicating that no products are to be displayed", () => {

      });
  })
});
