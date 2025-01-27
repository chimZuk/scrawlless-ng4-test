
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { BaseHrefModule } from '../../_modules/base-href/base-href.module';

@Injectable()
export class UserService {

  constructor(private http: Http, private basehref: BaseHrefModule) { }

  href: string = this.basehref.base;
  
  getUserInfo(data: any): Observable<any> {
    return this.http.post(this.href + 'api/userInfo.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  updateUserInfo(data: any): Observable<any> {
    return this.http.post(this.href + 'api/userInfo.update', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  getUserByID(data: any): Observable<any> {
    return this.http.post(this.href + 'api/user.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  searchUsers(data: any): Observable<any> {
    return this.http.post(this.href + 'api/findUsers', { data }).pipe(
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
