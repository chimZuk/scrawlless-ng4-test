
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { BaseHrefModule } from '../../_modules/base-href/base-href.module';


@Injectable()
export class DialogsService {

  constructor(private http: Http, private basehref: BaseHrefModule) { }

  href: string = this.basehref.base;
  
  readDialogs(data: any): Observable<any> {
    return this.http.post(this.href + 'api/dialogs.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  readDialog(data: any): Observable<any> {
    return this.http.post(this.href + 'api/dialog.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  createDialog(data: any): Observable<any> {
    return this.http.post(this.href + 'api/dialog.create', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

}
