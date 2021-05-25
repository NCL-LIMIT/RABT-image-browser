import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageBrowserComponent} from './image-browser/image-browser.component';


const routes: Routes = [
  { path: 'images', component: ImageBrowserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
