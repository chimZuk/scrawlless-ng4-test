import { Component, OnInit } from '@angular/core';

import { HomeworkService } from '../../../../_services/homework/homework.service';
import { LanguageService } from '../../../../_services/language/language.service';

@Component({
  selector: 'create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  constructor(
    private homeworkService: HomeworkService,
    private LanguageService: LanguageService
  ) { }

  terms: any = [];
  language: any = this.LanguageService.language;
  lang: number = this.LanguageService.lang;

  subjects: any = [
    {
      value: "1",
      name: this.language[this.lang].math
    },
    {
      value: "2",
      name: this.language[this.lang].physics
    }
  ]

  data: any = {
    token: JSON.parse(localStorage.getItem('currentUser')).token,
    info: {
      homeworkType: 'HW',
      date: '',
      subjectId: '1',
      data: {
        description: '',
        status: '',
        terms: this.terms,
        mark: ''
      }
    }
  }

  currentDate: any;

  loading: boolean = false;

  listCreate() {
    console.log(this.data);
    this.loading = true;
    this.homeworkService.listCreate(this.data)
      .subscribe(result => {
        console.log(this.data);
        this.loading = false;
      });
  }

  ngOnInit() {
    var currentDate = new Date();
    /*var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();*/
    this.data.info.date = currentDate;
  }

}
