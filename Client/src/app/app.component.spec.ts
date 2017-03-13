import { TestBed, async } from '@angular/core/testing';
import { Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { InfoServiceService } from './info-service.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

describe('AppComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers : [{
        provide: Router,
        useClass: class { navigate = jasmine.createSpy('navigate');}
      }],
      imports:[RouterTestingModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Skilaverkefni 3'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Skilaverkefni 3');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Skilaverkefni 3');
  }));
});
