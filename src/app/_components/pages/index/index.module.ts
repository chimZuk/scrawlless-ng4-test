import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';

import { FormsModule } from '@angular/forms';
import { MdInputModule, MdTooltipModule, MdButtonModule, MdCardModule, MdIconModule, MdTabsModule } from '@angular/material';

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';

import { IndexRouter } from './index.router'

@NgModule({
  imports: [
    FormsModule,
    IndexRouter,
    MdTooltipModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdTabsModule,
    MdInputModule
  ],
  declarations: [IndexComponent],
  providers: [
    AuthenticationService,
    SocketService
  ],
})
export class IndexModule { }
