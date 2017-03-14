import {TestBed, inject, async, getTestBed} from '@angular/core/testing';
import {InfoServiceService} from './info-service.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestOptions } from '@angular/http';

/**
 * it should try to issue a HTTP GET request when asked for a list of sellers (expect(mockHttp.get).toHaveBeenCalled();)
 * it should try to issue a POST request when a new Seller is being added
 * it should try to issue a POST request when a new Product is being added
 */

describe('InfoServiceService', () => {
  let service: InfoServiceService = null;
  let backend: MockBackend;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfoServiceService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: RequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([InfoServiceService, MockBackend], (info, mockBackend) => {
    let subject = info;
    let backend = mockBackend;
  }));


  /*it('should get profile data of user', (done) => {
    let profileInfo = { id: 1, name: 'Tester', category: 'Föt', imagePath: 'https://www.w3schools.com/css/img_fjords.jpg'};
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({ body: profileInfo });

      connection.mockRespond(new Response(options));
    });

    service.getSellerbyID(1).subscribe((response) => {
      expect(response).toBe(profileInfo);
      done();
    });
  });
*/


});
/*
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

  /*it('should return 1', inject([InfoServiceService], (service: InfoServiceService) => {
   expect(service.testingUnitTests()).toBe(1);
   }));*/

  /*it('should get one seller by id', async(() => {
   let infoService: InfoServiceService = getTestBed.get(InfoServiceService);
   }));

   it('should call get in getAllSellers', inject([InfoServiceService], (service: InfoServiceService) => {
   service.getAllSellers();
   expect(mockHttp.get).toHaveBeenCalled();
   }));

   it('should call get in getAllSellers', ()=>{
   service.getAllSellers();
   expect(mockHttp.get).toHaveBeenCalled();
   });

   it('should ...', inject([InfoServiceService], (service: InfoServiceService) => {
   expect(service).toBeTruthy();
   }));
   });

  describe('HomeService', () => {
    let service: InfoServiceService, mockHttp;

    beforeEach(() => {
      const mockHttp = {
        get: jasmine.createSpy('get'),
        post: jasmine.createSpy('post'),
        put: jasmine.createSpy('put'),
        map: jasmine.createSpy('map')
      };

    });
    describe('GetbyID', () => {
      it('should get the detail of user with passed id', () => {
        let user = {id: 1, name: 'Kalli'};
        mockHttp.get.and.returnValue(Observable.of(false));
        service.getSellerbyID(1);
        expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:5000/api/sellers/1');

      });
    });
  });
*/
