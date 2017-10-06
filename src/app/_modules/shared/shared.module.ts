import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdInputModule, MdTooltipModule, MdButtonModule, MdCardModule, MdIconModule, MdTabsModule, MdMenuModule, MdSnackBarModule, MdDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdTooltipModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdTabsModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdDialogModule
  ],
  exports: [
    CommonModule,
    MdTooltipModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdTabsModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdDialogModule
  ],
  declarations: []
})
export class SharedModule { }
