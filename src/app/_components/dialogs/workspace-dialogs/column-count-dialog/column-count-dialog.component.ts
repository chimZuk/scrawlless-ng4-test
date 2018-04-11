import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-column-count-dialog',
  templateUrl: './column-count-dialog.component.html',
  styleUrls: ['./column-count-dialog.component.css']
})
export class ColumnCountDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ColumnCountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
