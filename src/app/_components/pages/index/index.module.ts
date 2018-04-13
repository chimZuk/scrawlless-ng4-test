import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';

import { FormsModule } from '@angular/forms';

import { IndexRouter } from './index.router';

import { SharedModule } from '../../../_modules/shared/shared.module';

import { WorkspaceDialogsModule } from './../../dialogs-views/workspace-dialogs/workspace-dialogs.module';

import { MulColumnComponent } from './../../dialogs-views/workspace-dialogs/mul-column/mul-column.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IndexRouter,
    SharedModule,
    WorkspaceDialogsModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: []
})
export class IndexModule { }
