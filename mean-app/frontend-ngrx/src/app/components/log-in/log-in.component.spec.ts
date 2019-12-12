import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { LogInComponent } from './log-in.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
//import { EffectsModule } from 'src/app/app.module';


describe('Component: Login', () => {
  
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ LogInComponent ],
      providers: [AuthService, {
        provide: Store,
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  
  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
*/

});

