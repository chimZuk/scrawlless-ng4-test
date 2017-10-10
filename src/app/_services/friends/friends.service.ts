import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class FriendsService {

  constructor(private http: Http) { }

  getConnectedUsers(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/connectedUsers.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  addFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.create', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  deleteFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.delete', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  acceptFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.accept', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  declineFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.decline', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  cancelRequest(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnectionRequest.cancel', { data })
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
