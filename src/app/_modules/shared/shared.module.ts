import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatInputModule, MatTooltipModule, MatButtonModule, MatCardModule, MatIconModule, MatTabsModule, MatMenuModule, MatSnackBarModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  declarations: []
})
export class SharedModule { }
