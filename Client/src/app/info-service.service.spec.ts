import { TestBed, inject } from '@angular/core/testing';
import { InfoServiceService } from './info-service.service';
import {Http} from "@angular/http";


/**
 * it should try to issue a HTTP GET request when asked for a list of sellers (expect(mockHttp.get).toHaveBeenCalled();)
 * it should try to issue a POST request when a new Seller is being added
 * it should try to issue a POST request when a new Product is being added
 */
describe('InfoServiceService', () => {
  let service: InfoServiceService = null;

  const mockHttp = {
    get: jasmine.createSpy('get'),
    post: jasmine.createSpy('post'),
    put: jasmine.createSpy('put'),
    map: jasmine.createSpy('map')
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Http,
        useValue: mockHttp
      }, InfoServiceService]
    });
  });

  it('should return 1', inject([InfoServiceService], (service: InfoServiceService) => {
    expect(service.testingUnitTests()).toBe(1);
  }));

  /*it('should call get in getAllSellers', inject([InfoServiceService], (service: InfoServiceService) => {
    service.getAllSellers();
    expect(mockHttp.get).toHaveBeenCalled();
  }));*/

  /*it('should call get in getAllSellers', ()=>{
    service.getAllSellers();
    expect(mockHttp.get).toHaveBeenCalled();
  })*/

  /*it('should ...', inject([InfoServiceService], (service: InfoServiceService) => {
    expect(service).toBeTruthy();
  }));*/
});
