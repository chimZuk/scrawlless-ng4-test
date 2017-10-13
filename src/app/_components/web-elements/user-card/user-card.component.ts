import { Component, OnInit, Input } from '@angular/core';

import { LanguageService } from '../../../_services/language/language.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    console.log(this.user)
  }

  @Input('user') user: string;
  @Input('type') type: string;

  language: any = this.languageService.language;
  lang: number = this.languageService.lang;

}
