import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

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
    private LanguageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public HWData: any
  ) { }

  terms: any = [];
  language: any = this.LanguageService.language;
  lang: number = this.LanguageService.lang;

  disabledClass: any = false;

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

  startDate = new Date();

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
    console.log(this.HWData)
    if (this.HWData) {
      this.data.info.date = new Date(this.HWData.date);
      this.data.info.subjectId = String(this.HWData.subjectID);
      this.disabledClass = true;
    } else {
      var currentDate = new Date();
      this.data.info.date = currentDate;
      this.disabledClass = false;
    }
  }

}
