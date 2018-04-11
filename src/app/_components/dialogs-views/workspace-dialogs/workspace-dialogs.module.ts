import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceDialogsComponent } from './workspace-dialogs.component';
import { SumColumnComponent } from './sum-column/sum-column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WorkspaceDialogsComponent,
    SumColumnComponent
  ]
})
export class WorkspaceDialogsModule { }
