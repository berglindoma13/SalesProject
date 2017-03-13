import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { AddSellerDialogComponent } from './add-seller-dialog.component';

describe('AddSellerDialogComponent', () => {
  let component: AddSellerDialogComponent;
  let fixture: ComponentFixture<AddSellerDialogComponent>;

  const mockModal = {
    open: jasmine.createSpy('open')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSellerDialogComponent ],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: mockModal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
