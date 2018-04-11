import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../_modules/shared/shared.module'

import { ColumnCountDialog } from './column-count-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ColumnCountDialog
  ],
  entryComponents: [    
    ColumnCountDialog
  ]
})
export class ColumnCountDialogModule { }
