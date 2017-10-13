import { NgModule } from '@angular/core';
import { UserCardComponent } from './user-card.component';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [UserCardComponent]
})
export class UserCardModule { }
