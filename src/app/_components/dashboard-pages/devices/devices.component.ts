import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  language: any = this.authenticationService.language;
  lang: number = this.authenticationService.lang;

  ngOnInit() {
  }

}
