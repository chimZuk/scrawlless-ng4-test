import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../_modules/shared/shared.module'

import { WorkspaceDialogsComponent } from './workspace-dialogs.component';
import { SumColumnComponent } from './sum-column/sum-column.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SumColumnComponent    
  ],
  declarations: [
    WorkspaceDialogsComponent,
    SumColumnComponent
  ]
})
export class WorkspaceDialogsModule { }
