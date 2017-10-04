import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdInputModule, MdDialogModule, MdTooltipModule, MdButtonModule, MdCardModule, MdMenuModule, MdIconModule, MdTabsModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './_components/pages/index/index.component';

import { AuthenticationService } from './_services/authentication.service';
import { SocketService } from './_services/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    MdDialogModule, 
    MdTooltipModule, 
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdIconModule, 
    MdTabsModule,
    MdInputModule
  ],
  providers: [
    AuthenticationService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
