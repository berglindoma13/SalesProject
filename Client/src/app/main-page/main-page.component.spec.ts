import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoServiceService } from '../info-service.service';
import { MainPageComponent } from './main-page.component';

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

  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
        providers:[{
          provide: InfoServiceService,
            useValue: mockService
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

  describe("when info service returns empty list of products", () =>{
      mockService.successGetSellers = true;
      mockService.sellerList = [];

      it("should display a message indicating that no products are to be displayed", () => {

      });
  })
});
