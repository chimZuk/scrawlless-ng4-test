import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';

import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';

import { IndexRouter } from './index.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    FormsModule,
    IndexRouter,
    SharedModule
  ],
  declarations: [IndexComponent],
  providers: [
    AuthenticationService,
    SocketService
  ],
})
export class IndexModule { }
