import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.lang = this.authenticationService.lang;
  }

  loading = false;
  error;

  language: any = this.authenticationService.language;

  lang: number = this.authenticationService.lang;
  data: any;
  user: any = {
    firstName: '',
    lastName: '',
    type: '',
    email: '',
    password: ''
  }
  errorMessage: any;

  types = [{
    code: '1',
    name: this.language[this.lang].stud
  },
  {
    code: '2',
    name: this.language[this.lang].teach
  }];

  login() {
    this.loading = true;
    this.authenticationService.login(this.user)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  log() {
    var data = {
      email: this.user.email,
      password: this.user.password
    }
    this.loading = true;
    this.authenticationService.log(data)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  ngOnInit() {
    //this.router.navigate(['/dashboard']);
  }
}
