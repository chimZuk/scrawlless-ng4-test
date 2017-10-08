import { NgModule } from '@angular/core';
import { DevicesComponent } from './devices.component';

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';

import { DevicesRouter } from './devices.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    DevicesRouter,
    SharedModule
  ],
  declarations: [
    DevicesComponent
  ],
  providers: [
    AuthenticationService,
    SocketService
  ]
})
export class DevicesModule { }
