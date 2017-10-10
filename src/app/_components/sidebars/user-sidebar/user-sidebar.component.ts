import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { LanguageService } from '../../../_services/language/language.service';

@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private languageService: LanguageService
  ) {
    router.events.subscribe((val) => {
      this.pageName = this.location.path();
    });
  }

  language: any = this.languageService.language;
  lang: number = this.languageService.lang;

  pageName: any = this.location.path();

  isMessage() {
    return this.pageName.indexOf('/dashboard/im') > -1;
  }

  ngOnInit() {
  }

}
