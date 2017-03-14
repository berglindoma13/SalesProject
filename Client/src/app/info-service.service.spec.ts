///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>
import {TestBed, inject} from '@angular/core/testing';
import {InfoServiceService} from './info-service.service';
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

/**
 * it should try to issue a HTTP GET request when asked for a list of sellers (expect(mockHttp.get).toHaveBeenCalled();)
 * it should try to issue a POST request when a new Seller is being added
 * it should try to issue a POST request when a new Product is being added
 */

describe('InfoServiceService', () => {
  let service: InfoServiceService = null;
  let backend: MockBackend = null;
  let sellers = [
    {
      id: 1,
      name: "prufa",
      category: "fatnaður",
      imagePath: "image"
    },
    {
      id: 2,
      name: "kalli",
      category: "matur",
      imagePath: "images"
    }
  ];

  let newSeller = [
    {
      id: 1,
      name: "prufa",
      category: "fatnaður",
      imagePath: "image"
    }
  ];

  let newguy = {
    id: 5,
    name: "prufa",
    category: "fatnaður",
    imagePath: "image"
  };

  let products = {
    id: 1,
    quantitySold: 23,
    quantityInStock: 23,
    imagePath: "img",
    name: "Kaka",
    price: 2000,
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfoServiceService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, defaultOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([InfoServiceService, MockBackend], (info, mockBackend) => {
    service = info;
    backend = mockBackend;
  }));


  it('should get one seller', (done) => {
    backend.connections.subscribe((c: MockConnection) => {
      let connection = c;
      let options = new ResponseOptions({body: sellers});
      expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1');
      expect(connection.request.method).toEqual(RequestMethod.Get);

      connection.mockRespond(new Response(options));
    });

    service.getSellerbyID(1).subscribe((response) => {
      expect(response).toEqual(sellers);
      done();
    });

  });

  it('should return list of sellers', (done) => {
    backend.connections.subscribe((c: MockConnection) => {
      let connection = c;
      let options = new ResponseOptions({body: sellers});
      expect(connection.request.url).toEqual('http://localhost:5000/api/sellers');
      expect(connection.request.method).toEqual(RequestMethod.Get);

      connection.mockRespond(new Response(options));
    });

    service.getAllSellers().subscribe((result) => {
      expect(result).toEqual(sellers);
      done();
    });
  });

  it('should add seller', (done) => {
    backend.connections.subscribe((c: MockConnection) => {
      let connection = c;
      let options = new ResponseOptions({body: sellers});
      expect(connection.request.url).toEqual('http://localhost:5000/api/sellers');
      expect(connection.request.method).toEqual(RequestMethod.Post);

      connection.mockRespond(new Response(options));
    });

    service.addSeller(newguy).subscribe((result) => {
      expect(result).toEqual(sellers);
      done();
    });
  });

  it('should add product', (done) => {
    backend.connections.subscribe((c: MockConnection) => {
      let connection = c;
      let options = new ResponseOptions({body: products});
      expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1/products');
      expect(connection.request.method).toEqual(RequestMethod.Post);

      connection.mockRespond(new Response(options));
    });

    service.addProduct(products, 1).subscribe((result) => {
      expect(result).toEqual(products);
      done();
    });
  });

  it('should get seller products', (done) => {
    backend.connections.subscribe((c: MockConnection) => {
      let connection = c;
      let options = new ResponseOptions({body: products});
      expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1/products');
      expect(connection.request.method).toEqual(RequestMethod.Post);

      connection.mockRespond(new Response(options));
    });

    service.getSellerProducts(1).subscribe((result) => {
      expect(result).toEqual(products);
      done();
    });
  });

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

 it('should return 1', inject([InfoServiceService], (service: InfoServiceService) => {
 expect(service.testingUnitTests()).toBe(1);
 }));

 it('should get one seller by id', async(() => {
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
 });*/
/*
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
 });*/
