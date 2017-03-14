///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>
import {TestBed, inject} from '@angular/core/testing';
import {InfoServiceService} from './info-service.service';
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';


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
      expect(connection.request.method).toEqual(RequestMethod.Get);

      connection.mockRespond(new Response(options));
    });

    service.getSellerProducts(1).subscribe((result) => {
      expect(result).toEqual(products);
      done();
    });
  });

  it('should edit seller', (done) => {
    backend.connections.subscribe((c: MockConnection) => {
      let connection = c;
      let options = new ResponseOptions({body: sellers});
      expect(connection.request.url).toEqual('http://localhost:5000/api/sellers');
      expect(connection.request.method).toEqual(RequestMethod.Post);

      connection.mockRespond(new Response(options));
    });

    service.addSeller(newguy).subscribe((response) => {
      expect(response).toEqual(sellers);
      done();
    });
  });


  it('should edit product', (done) => {
    backend.connections.subscribe((c: MockConnection) => {
      let connection = c;
      let options = new ResponseOptions({body: products});
      expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1/products/1');
      expect(connection.request.method).toEqual(RequestMethod.Put);

      connection.mockRespond(new Response(options));
    });

    service.editProduct(1, products).subscribe((result) => {
      expect(result).toEqual(products);
      done();
    });
  });
});

