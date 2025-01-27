
import {filter} from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


import { Title } from '@angular/platform-browser';

import { LanguageService } from './_services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private router: Router,
    private languageService: LanguageService
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        var title: String = String(event.urlAfterRedirects);
        title = title.substring(title.lastIndexOf("/") + 1);
        switch (title) {
          case "index": this.titleService.setTitle(this.titles[this.lang].index);
            break;
          case "lists": this.titleService.setTitle(this.titles[this.lang].lists);
            break;
          case "marks": this.titleService.setTitle(this.titles[this.lang].marks);
            break;
          case "users": this.titleService.setTitle(this.titles[this.lang].users);
            break;
          case "im": this.titleService.setTitle(this.titles[this.lang].im);
            break;
          case "devices": this.titleService.setTitle(this.titles[this.lang].devices);
          default: break;
        }
      });
  }
  titles: any = this.languageService.titles;
  lang: number = this.languageService.lang;

}
