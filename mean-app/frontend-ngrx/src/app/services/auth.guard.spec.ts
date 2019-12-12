 
import { AuthGuardService } from './auth-guard.service'; 

class MockRouter { 
    navigate ( path ) {} 
} 

describe ( 'AuthGuard' , () => { 
    describe ( 'canActivate' , () => { 
        let authGuard : AuthGuardService ; 
        let authService; 
        let router; 

        it ( 'should return true for a logged in user' , () => { 
            authService = { 
                getToken : () => true 
            }; 
            router = new MockRouter(); 
            authGuard = new AuthGuardService ( authService , router ); 
            expect ( authGuard.canActivate()).toEqual ( true ); 
        }); 
/*
        it ( 'should navigate to home for a logged out user' , () => { 
            authService = { 
                getToken : () => false 
            }; 
                router = new MockRouter (); 
                authGuard = new AuthGuardService ( authService , router ); 
                spyOn ( router , 'navigate' ); 
                expect ( authGuard.canActivate()).toEqual ( false );     
        });*/
    }); 
});
 