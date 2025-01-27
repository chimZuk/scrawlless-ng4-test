import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { LOCALE_ID } from '@angular/core';

import { AuthGuard } from './_guards/auth.guard';

import { SharedModule } from './_modules/shared/shared.module'
import { BaseHrefModule } from './_modules/base-href/base-href.module'
import { appRouter } from './app-routing.module';

import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { FormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule }
  from '@angular/material';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    appRouter,
    SharedModule,
    BaseHrefModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: (navigator.language == "ru" || navigator.language == "ru-RU") ? "ru" : "en-US",
    },
    AuthGuard
  ]
})
export class AppModule { }
