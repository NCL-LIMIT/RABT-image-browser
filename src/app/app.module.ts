import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageBrowserComponent } from './image-browser/image-browser.component';
import {HttpClientModule} from '@angular/common/http';
import {ImageModalComponent} from './image-modal/image-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FlexModule} from '@angular/flex-layout';
import { SigninComponent } from './signin/signin.component';
import {FormsModule} from '@angular/forms';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { PasswordDirective } from './password.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImageBrowserComponent,
    ImageModalComponent,
    SigninComponent,
    FullScreenComponent,
    PasswordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FlexModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
