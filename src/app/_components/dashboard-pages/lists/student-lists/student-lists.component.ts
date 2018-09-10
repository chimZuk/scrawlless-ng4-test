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
        console.log(result);
        this.homeworks = result;
        this.loading = false;



        //--------------Semesters implementation

        var startD = new Date("2018-09-01");
        var endD = new Date("2018-12-25");

        this.studyYear = {
          name: "Летняя сессия",
          startDate: startD,
          endDate: endD,
          semesters: [
            {
              id: 0,
              name: "Первая четверть",
              startDate: new Date("2018-09-01"),
              endDate: new Date("2018-11-04"),
              studyWeeks: []
            },
            {
              id: 1,
              name: "Вторая четверть",
              startDate: new Date("2018-11-05"),
              endDate: new Date("2018-12-25"),
              studyWeeks: []
            }
          ]

        }


        for (let i = 0; i < this.studyYear.semesters.length; i++) {
          var d = new Date(this.studyYear.semesters[i].startDate);
          var week = {
            startDate: new Date(),
            endDate: new Date(),
            startDateName: "",
            endDateName: "",
            days: []
          };
          var ifWeek = true;


          for (d; d <= this.studyYear.semesters[i].endDate; d.setDate(d.getDate() + 1)) {
            var cDate = new Date(d);
            var cDay = cDate.getDay();

            if (cDay > 0) {
              if (cDay == 1 || (cDay != 1 && ifWeek)) {
                week.startDateName = this.daysOfWeek[this.lang][cDate.getDay()] + " " + cDate.getDate();
                week.startDate = cDate;

                var classes = [];

                for (var j = 0; j < this.schedule.subjects.length; j++) {
                  for (var jj = 0; jj < this.schedule.subjects[j].days.length; jj++) {
                    if (cDate.getDay() == this.schedule.subjects[j].days[jj]) {

                      var lists = [];
                      for (let jjj = 0; jjj < this.homeworks.length; jjj++) {
                        var hDate = new Date(this.homeworks[jjj].date);
                        if (hDate.getTime() === cDate.getTime()) {
                          if (this.homeworks[jjj].subjectId == this.schedule.subjects[j].id) {
                            lists.push(this.homeworks[jjj]);
                          }
                        }
                      }

                      classes.push({
                        id: this.schedule.subjects[j].id,
                        name: this.schedule.subjects[j].name,
                        lists: lists
                      })
                    }
                  }
                }

                week.days.push({
                  date: cDate,
                  day: this.daysOfWeek[this.lang][cDate.getDay()] + ", " + cDate.getDate(),
                  lists: lists,
                  classes: classes
                });
                week.endDateName = this.daysOfWeek[this.lang][cDate.getDay()] + " " + cDate.getDate();
                week.endDate = cDate;
                ifWeek = false;
              } else {
                if (cDay != 1 && !ifWeek) {


                  var classes = [];

                  for (var j = 0; j < this.schedule.subjects.length; j++) {
                    for (var jj = 0; jj < this.schedule.subjects[j].days.length; jj++) {
                      if (cDate.getDay() == this.schedule.subjects[j].days[jj]) {

                        var lists = [];
                        for (let jjj = 0; jjj < this.homeworks.length; jjj++) {
                          var hDate = new Date(this.homeworks[jjj].date);
                          if (hDate.getTime() === cDate.getTime()) {
                            if (this.homeworks[jjj].subjectId == this.schedule.subjects[j].id) {
                              lists.push(this.homeworks[jjj]);
                            }
                          }
                        }

                        classes.push({
                          id: this.schedule.subjects[j].id,
                          name: this.schedule.subjects[j].name,
                          lists: lists
                        })
                      }
                    }
                  }



                  week.days.push({
                    date: cDate,
                    day: this.daysOfWeek[this.lang][cDate.getDay()] + ", " + cDate.getDate(),
                    lists: lists,
                    classes: classes
                  });
                  week.endDateName = this.daysOfWeek[this.lang][cDate.getDay()] + " " + cDate.getDate();
                  week.endDate = cDate;
                }
              }
            } else {
              this.studyYear.semesters[i].studyWeeks.push(week);
              week = {
                startDate: new Date(),
                endDate: new Date(),
                startDateName: "",
                endDateName: "",
                days: []
              };
              ifWeek = true;
            }
          }

          if (!ifWeek) {
            this.studyYear.semesters[i].studyWeeks.push(week);
            week = {
              startDate: new Date(),
              endDate: new Date(),
              startDateName: "",
              endDateName: "",
              days: []
            };
            ifWeek = true;
          }

        }

        console.log(this.studyYear);

        var currentDate = new Date();
        if (currentDate.getDay() == 0) {
          currentDate.setDate(currentDate.getDate() + 1);
        }
        if (currentDate <= this.studyYear.endDate && currentDate >= this.studyYear.startDate) {
          for (var i = 0; i < this.studyYear.semesters.length; i++) {
            console.log(this.studyYear.semesters[i].endDate)
            if (currentDate <= this.studyYear.semesters[i].endDate && currentDate >= this.studyYear.semesters[i].startDate) {
              this.currentWeek.semester = i;
              for (var j = 0; j < this.studyYear.semesters[i].studyWeeks.length; j++) {
                if (currentDate <= this.studyYear.semesters[i].studyWeeks[j].endDate && currentDate >= this.studyYear.semesters[i].studyWeeks[j].startDate) {
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

        console.log(this.currentWeek);
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
