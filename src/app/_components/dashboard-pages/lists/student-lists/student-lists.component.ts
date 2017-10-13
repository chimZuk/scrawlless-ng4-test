import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LanguageService } from '../../../../_services/language/language.service';
import { HomeworkService } from '../../../../_services/homework/homework.service';

import { CreateListComponent } from '../../../dialogs/dashboard-dialogs/create-list/create-list.component'


@Component({
  selector: 'student-lists',
  templateUrl: './student-lists.component.html',
  styleUrls: ['./student-lists.component.css']
})
export class StudentListsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private homeworkService: HomeworkService,
    private languageService: LanguageService
  ) { }

  language: any = this.languageService.language;
  lang: number = this.languageService.lang;
  lists: any[] = [];
  loading: boolean = true;
  sortedByDate: any[] = [{
    date: '',
    hw: []
  }];
  homeworks: any[];

  openDialog() {
    let dialogRef = this.dialog.open(CreateListComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      this.hwRead();
    });
  }



  hwRead() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let data = {
      token: token
    }
    this.loading = true;
    this.homeworkService.getHomeworks(data)
      .subscribe(result => {
        console.log(result);
        this.homeworks = result;
        this.loading = false;
        var isDate = true;
        for (var i = 0; i < result.length; i++) {
          for (var j = 0; j < this.sortedByDate.length; j++) {
            if (this.sortedByDate[j].date && result[i].date == this.sortedByDate[j].date) {
              this.sortedByDate[j].hw.push(result[i]);
              isDate = false;
              break;
            }
            if (isDate) {
              this.sortedByDate.push({
                date: result[i].date,
                hw: [result[i]]
              });
            }
          }
        }
      });
  }

  /*directToList(id) {
    this.router.navigate(['homework', id]);
  }*/

  deleteList(homeworkId) {
    console.log(homeworkId)
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let data = {
      token: token,
      homeworkId: homeworkId
    }
    this.loading = true;
    this.homeworkService.deleteList(data)
      .subscribe(result => {
        this.hwRead();
      });
  }

  ngOnInit() {
    this.hwRead();
  }

  terms: any = []

  data: any = {
    token: JSON.parse(localStorage.getItem('currentUser')).token,
    info: {
      homeworkType: 'HW',
      date: '2017-11-11',
      subjectId: '1',
      data: {
        terms: this.terms,
        mark: ''
      }
    }
  }


  listCreate() {
    this.openDialog();
  }

}
