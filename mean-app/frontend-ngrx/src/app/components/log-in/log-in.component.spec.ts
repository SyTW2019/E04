import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogInComponent } from './log-in.component';
import { AuthService } from "../../services/auth.service";
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthGuardService } from '../../services/auth-guard.service';

import { AppState, selectAuthState } from '../../store/app.states';
import { State } from '../../store/reducers/auth.reducers';

describe('Component: Login', () => {
  
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;
  
  let store: MockStore<{ loggedin: boolean}>;
  const initialState = {loggedin: false};
  //let guard: AuthGuardService;

  let State: State;
  
  beforeEach(() => {
      
      // refine the test module by declaring the test component
      TestBed.configureTestingModule({
          imports:[RouterTestingModule, FormsModule],
          declarations: [LogInComponent],
          providers: [AuthService,
                      provideMockStore({initialState})],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
      });

      // create component and test fixture
      fixture = TestBed.createComponent(LogInComponent);

      // get test component from the fixture
      component = fixture.componentInstance;

      // UserService provided to the TestBed
      //authService = TestBed.get(AuthService);

      


      //guard = TestBed.get<AuthGuardService>(AuthGuardService)
  });


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(LogInComponent);
    const app = fixture.debugElement.componentInstance;
    expect(selectAuthState).toBeTruthy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
  
});
