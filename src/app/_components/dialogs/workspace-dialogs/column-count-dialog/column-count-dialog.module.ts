import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../_modules/shared/shared.module'

import { WorkspaceDialogsModule } from './../../../dialogs-views/workspace-dialogs/workspace-dialogs.module'
import { ColumnCountDialog } from './column-count-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WorkspaceDialogsModule
  ],
  declarations: [
    ColumnCountDialog
  ],
  entryComponents: [    
    ColumnCountDialog
  ]
})
export class ColumnCountDialogModule { }
