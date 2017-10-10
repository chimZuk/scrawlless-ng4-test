import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../_services/authentication/authentication.service';
import { LanguageService } from '../../../_services/language/language.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private languageService: LanguageService
  ) { }


  //region Variables

  loading = false;
  error: String;
  language: any = this.languageService.language;
  lang: number = this.languageService.lang;
  data: any;
  user: any = {
    firstName: '',
    lastName: '',
    type: '',
    email: '',
    password: ''
  }
  types = [{
    code: '1',
    name: this.language[this.lang].stud
  },
  {
    code: '2',
    name: this.language[this.lang].teach
  }];

  //endregion Variables

  //region HTTP requests

  register() {
    this.loading = true;
    this.authenticationService.register(this.user)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  login() {
    var data = {
      email: this.user.email,
      password: this.user.password
    }
    this.loading = true;
    this.authenticationService.login(data)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = this.language[this.lang].incorrectData;
          console.log(this.error);
          this.loading = false;
        }
      });
  }

  //endregion HTTP requests


  ngOnInit() {
  }

}
