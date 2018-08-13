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

  daysOfWeek: any[] = this.languageService.daysOfWeek;


  openDialog() {
    let dialogRef = this.dialog.open(CreateListComponent);
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
        console.log(result);
        this.homeworks = result;
        this.loading = false;



        //--------------Semesters implementation

        var startD = new Date("2018-08-10");
        var endD = new Date("2018-09-06");

        console.log(startD < endD);

        this.studyYear = {
          name: "Летняя сессия",
          startDate: startD,
          endDate: endD,
          semesters: [
            {
              id: 0,
              name: "Первая четверть",
              startDate: new Date("2018-08-10"),
              endDate: new Date("2018-08-16"),
              studyWeeks: []
            },
            {
              id: 1,
              name: "Вторая четверть",
              startDate: new Date("2018-08-17"),
              endDate: new Date("2018-08-23"),
              studyWeeks: []
            },
            {
              id: 2,
              name: "Третья четверть",
              startDate: new Date("2018-08-24"),
              endDate: new Date("2018-08-30"),
              studyWeeks: []
            },
            {
              id: 3,
              name: "Четвёртая четверть",
              startDate: new Date("2018-08-31"),
              endDate: new Date("2018-09-06"),
              studyWeeks: []
            }
          ]

        }


        for (let i = 0; i < 4; i++) {
          var d = new Date(this.studyYear.semesters[i].startDate);
          var week = {
            startDate: "",
            endDate: "",
            days: []
          };
          var ifWeek = true;


          for (d; d <= this.studyYear.semesters[i].endDate; d.setDate(d.getDate() + 1)) {
            var cDate = new Date(d);
            var cDay = cDate.getDay();

            if (cDay > 0) {
              if (cDay == 1 || (cDay != 1 && ifWeek)) {
                week.startDate = this.daysOfWeek[this.lang][cDate.getDay()] + " " + cDate.getDate();

                var lists = [];
                for (let j = 0; j < this.homeworks.length; j++) {
                  var hDate = new Date(this.homeworks[j].date);
                  if (hDate.getTime() === cDate.getTime()) {
                    lists.push(this.homeworks[j]);
                  }
                }

                week.days.push({
                  date: cDate,
                  day: this.daysOfWeek[this.lang][cDate.getDay()],
                  lists: lists
                });
                week.endDate = this.daysOfWeek[this.lang][cDate.getDay()] + " " + cDate.getDate();
                ifWeek = false;
              } else {
                if (cDay != 1 && !ifWeek) {

                  var lists = [];
                  for (let j = 0; j < this.homeworks.length; j++) {
                    var hDate = new Date(this.homeworks[j].date);
                    if (hDate.getTime() === cDate.getTime()) {
                      lists.push(this.homeworks[j]);
                    }
                  }

                  week.days.push({
                    date: cDate,
                    day: this.daysOfWeek[this.lang][cDate.getDay()],
                    lists: lists
                  });
                  week.endDate = this.daysOfWeek[this.lang][cDate.getDay()] + " " + cDate.getDate();
                }
              }
            } else {
              this.studyYear.semesters[i].studyWeeks.push(week);
              week = {
                startDate: "",
                endDate: "",
                days: []
              };
              ifWeek = true;
            }
          }

          if (!ifWeek) {
            this.studyYear.semesters[i].studyWeeks.push(week);
            week = {
              startDate: "",
              endDate: "",
              days: []
            };
            ifWeek = true;
          }

        }


        console.log(this.studyYear);


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


  listCreate() {
    this.openDialog();
  }

}
