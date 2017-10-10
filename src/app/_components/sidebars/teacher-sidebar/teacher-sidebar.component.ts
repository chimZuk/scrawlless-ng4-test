import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../../../_services/language/language.service';

@Component({
  selector: 'teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.css']
})
export class TeacherSidebarComponent implements OnInit {

  constructor(
    private languageService: LanguageService
  ) { }

  language: any = this.languageService.language;
  lang: number = this.languageService.lang;

  ngOnInit() {
  }

}
