import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'



@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUserInfo(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userInfo.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  updateUserInfo(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userInfo.update', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  getUserByID(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/user.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  searchUsers(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/findUsers', { data })
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
