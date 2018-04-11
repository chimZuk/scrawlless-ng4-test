import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../_modules/shared/shared.module'

import { WorkspaceDialogsComponent } from './workspace-dialogs.component';
import { SumColumnComponent } from './sum-column/sum-column.component';
import { MulColumnComponent } from './mul-column/mul-column.component';
import { DivColumnComponent } from './div-column/div-column.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SumColumnComponent,
    MulColumnComponent,
    DivColumnComponent  
  ],
  declarations: [
    WorkspaceDialogsComponent,
    SumColumnComponent,
    MulColumnComponent,
    DivColumnComponent
  ]
})
export class WorkspaceDialogsModule { }
