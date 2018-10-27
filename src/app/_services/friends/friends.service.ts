
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { BaseHrefModule } from '../../_modules/base-href/base-href.module';


@Injectable()
export class FriendsService {

  constructor(private http: Http, private basehref: BaseHrefModule) { }

  href: string = this.basehref.base;
  
  getConnectedUsers(data: any): Observable<any> {
    return this.http.post(this.href + 'api/connectedUsers.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  addFriend(data: any): Observable<any> {
    return this.http.post(this.href + 'api/userConnection.create', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  deleteFriend(data: any): Observable<any> {
    return this.http.post(this.href + 'api/userConnection.delete', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  acceptFriend(data: any): Observable<any> {
    return this.http.post(this.href + 'api/userConnection.accept', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  declineFriend(data: any): Observable<any> {
    return this.http.post(this.href + 'api/userConnection.decline', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  cancelRequest(data: any): Observable<any> {
    return this.http.post(this.href + 'api/userConnectionRequest.cancel', { data }).pipe(
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
