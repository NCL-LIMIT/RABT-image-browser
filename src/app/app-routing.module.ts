import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageBrowserComponent} from './image-browser/image-browser.component';
import {SigninComponent} from './signin/signin.component';
import {FullScreenComponent} from './full-screen/full-screen.component';


const routes: Routes = [
  { path: 'images', component: ImageBrowserComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'full', component: FullScreenComponent},
  {path: '',  redirectTo: 'signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
