import { ZopperSampleFormComponent } from './zopper-sample-form/zopper-sample-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'zopper', component: ZopperSampleFormComponent },
  { path: '', redirectTo: 'zopper', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
