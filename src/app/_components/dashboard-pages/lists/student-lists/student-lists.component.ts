import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Router } from '@angular/router';

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
    private router: Router,
    private homeworkService: HomeworkService,
    private languageService: LanguageService
  ) { }

  language: any = this.languageService.language;
  lang: number = this.languageService.lang;
  lists: any[] = [];
  loading: boolean = true;
  homeworks: any[];

  studyYear: any = {
    name: "",
    startDate: "",
    endDate: "",
    semesters: []
  }

  currentWeek: any = {
    semester: 0,
    week: 0
  };

  schedule: any = {
    subjects: [
      {
        id: 1,
        name: "Математика",
        days: [
          1, 2, 3, 4, 5
        ]
      },
      {
        id: 2,
        name: "Физика",
        days: [

        ]
      },
      {
        id: 3,
        name: "Факультатив",
        days: [

        ]
      }
    ]
  }

  daysOfWeek: any[] = this.languageService.daysOfWeek;


  openDialog(subjID, date) {
    var data: any = false;
    if (subjID != 0 && date != 0) {
      data = {
        subjectID: subjID,
        date: date
      }
    }

    let dialogRef = this.dialog.open(CreateListComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      this.hwRead();
    });
  }


  setWeek(sem, id) {
    this.currentWeek = {
      semester: sem,
      week: id
    }
    console.log(this.currentWeek)
  }



  hwRead() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let data = {
      token: token
    }
    this.loading = true;
    this.homeworkService.getHomeworks(data)
      .subscribe(result => {
        this.studyYear = result[0];
        var currentDate = new Date();
        if (currentDate.getDay() == 0) {
          currentDate.setDate(currentDate.getDate() + 1);
        } else {
          if (currentDate.getDay() == 6) {
            currentDate.setDate(currentDate.getDate() - 2);
          }
        }


        if (currentDate <= new Date(this.studyYear.endDate) && currentDate >= new Date(this.studyYear.startDate)) {
          for (var i = 0; i < this.studyYear.semesters.length; i++) {
            if (currentDate <= new Date(this.studyYear.semesters[i].endDate) && currentDate >= new Date(this.studyYear.semesters[i].startDate)) {
              this.currentWeek.semester = i;
              for (var j = 0; j < this.studyYear.semesters[i].studyWeeks.length; j++) {
                console.log("lol");
                console.log(currentDate);
                console.log(new Date(this.studyYear.semesters[i].studyWeeks[j].startDate));
                console.log(new Date(this.studyYear.semesters[i].studyWeeks[j].endDate));
                if (currentDate <= new Date(this.studyYear.semesters[i].studyWeeks[j].endDate) && currentDate >= new Date(this.studyYear.semesters[i].studyWeeks[j].startDate)) {
                  this.currentWeek.week = j;
                  break;
                }
              }
              break;
            } else {
            }
          }
        } else {
        }
        console.log(this.studyYear);
        console.log(this.currentWeek);
        this.loading = false;
        //-----------End of Semesters implementation

      });
  }

  directToList(id) {
    this.router.navigate(['homework', id]);
  }

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


  listCreate(subjID, date) {
    console.log(arguments);
    this.openDialog(subjID, date);
  }

}
