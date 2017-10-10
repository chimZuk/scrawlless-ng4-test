import { NgModule } from '@angular/core';
import { DevicesComponent } from './devices.component';

import { FormsModule } from '@angular/forms';

import { DevicesRouter } from './devices.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    FormsModule,
    DevicesRouter,
    SharedModule
  ],
  declarations: [
    DevicesComponent
  ],
  providers: []
})
export class DevicesModule { }
