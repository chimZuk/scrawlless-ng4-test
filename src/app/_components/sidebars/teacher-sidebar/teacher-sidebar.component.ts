import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.css']
})
export class TeacherSidebarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  language: any = this.authenticationService.language;
  lang: number = this.authenticationService.lang;

  ngOnInit() {
  }

}
