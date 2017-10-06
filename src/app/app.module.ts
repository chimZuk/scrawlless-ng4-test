import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LOCALE_ID } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { appRouter } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthenticationService } from './_services/authentication.service'




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    appRouter
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthenticationService,
    {
      provide: LOCALE_ID,
      useValue: navigator.language
    }
  ]
})
export class AppModule { }
