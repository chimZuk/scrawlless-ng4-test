import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { FormsModule } from '@angular/forms';
import { MdInputModule, MdTooltipModule, MdButtonModule, MdCardModule, MdIconModule, MdTabsModule, MdMenuModule, MdSnackBarModule, MdDialogModule } from '@angular/material';
import { CapitalizePipe } from "../../../_pipes/capitalize.pipe";
import { DecapitalizePipe } from "../../../_pipes/decapitalize.pipe";
import { MonthPipe } from "../../../_pipes/month.pipe";

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';

import { UserSidebarComponent } from '../../sidebars/user-sidebar/user-sidebar.component';
import { TeacherSidebarComponent } from '../../sidebars/teacher-sidebar/teacher-sidebar.component';

import { DashboardRouter } from './dashboard.router'

@NgModule({
  imports: [
    CommonModule,
    DashboardRouter,
    MdTooltipModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdTabsModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdDialogModule
  ],
  declarations: [
    DashboardComponent,
    TeacherSidebarComponent,
    UserSidebarComponent, 
    CapitalizePipe, 
    DecapitalizePipe, 
    MonthPipe
  ],
  providers: [
    AuthenticationService,
    SocketService
  ],
})
export class DashboardModule { }
