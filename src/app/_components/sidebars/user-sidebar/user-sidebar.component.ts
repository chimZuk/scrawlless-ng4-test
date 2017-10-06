import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private location: Location, private router: Router, private authenticationService: AuthenticationService) { 
    router.events.subscribe((val) => {
      this.pageName = this.location.path();
    });
  }

  language: any = this.authenticationService.language;
  lang: number = this.authenticationService.lang;

  pageName: any = this.location.path();
  
  isMessage(){
    return this.pageName.indexOf('/dashboard/im') > -1;
  }

  ngOnInit() {
  }

}
