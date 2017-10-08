import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';

import { DashboardRouter } from './dashboard.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

import { CapitalizePipe } from "../../../_pipes/capitalize.pipe";
import { DecapitalizePipe } from "../../../_pipes/decapitalize.pipe";
import { MonthPipe } from "../../../_pipes/month.pipe";

import { UserSidebarComponent } from '../../sidebars/user-sidebar/user-sidebar.component';
import { TeacherSidebarComponent } from '../../sidebars/teacher-sidebar/teacher-sidebar.component';

@NgModule({
  imports: [
    DashboardRouter,
    SharedModule
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
