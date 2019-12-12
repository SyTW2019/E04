import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
<<<<<<< HEAD
  

=======
/*
>>>>>>> e04ff6a51d8a3a4b655d4d36cfbe8f7caa72376c
  it(`should have as title 'frontend-ngrx'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontend-ngrx');
<<<<<<< HEAD
  });
=======
  });*/
>>>>>>> e04ff6a51d8a3a4b655d4d36cfbe8f7caa72376c
/*
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('frontend-ngrx app is running!');
  });*/
});

