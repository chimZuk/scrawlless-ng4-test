import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'column-count',
  templateUrl: './column-count-dialog.component.html',
  styleUrls: ['./column-count-dialog.component.css']
})
export class ColumnCountDialog {

  constructor(
    public dialogRef: MatDialogRef<ColumnCountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.terms = data.terms;
    this.operator = data.operator;
  }

  terms: any = [];
  operator: string = "sum";

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}