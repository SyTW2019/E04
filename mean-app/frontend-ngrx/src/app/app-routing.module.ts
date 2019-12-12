import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { RestrictedComponent } from './restricted/restricted.component'; 
import { UnrestrictedComponent } from './unrestricted/unrestricted.component'; 

const routes : Routes = [ { 
  path : '', 
  component : UnrestrictedComponent 
}, 
{ path : 'restricted', 
  component : RestrictedComponent 
} ]; 



//const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
