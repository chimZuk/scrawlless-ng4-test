import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';

import { FormsModule } from '@angular/forms';

import { IndexRouter } from './index.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    FormsModule,
    IndexRouter,
    SharedModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: []
})
export class IndexModule { }
