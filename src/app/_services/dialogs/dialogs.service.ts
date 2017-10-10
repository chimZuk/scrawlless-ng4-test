import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class DialogsService {

  constructor(private http: Http) { }

  readDialogs(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/dialogs.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  readDialog(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/dialog.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  createDialog(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/dialog.create', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

}
