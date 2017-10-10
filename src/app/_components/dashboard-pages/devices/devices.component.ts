import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../../../_services/language/language.service';
import { SocketService } from '../../../_services/socket/socket.service';

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(
    private languageService: LanguageService
  ) { }

  language: any = this.languageService.language;
  lang: number = this.languageService.lang;

  ngOnInit() {
  }

}
