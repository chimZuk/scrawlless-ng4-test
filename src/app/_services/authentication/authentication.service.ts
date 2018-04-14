import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { BaseHrefModule } from '../../_modules/base-href/base-href.module';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private basehref: BaseHrefModule) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  public token: string;
  mode = "user";
  subjects: any[];
  href: string = this.basehref.base;
  


  patterns = {
    email: '(?:[a-z0-9!#$%&*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
  };

  register(data: any): Observable<boolean> {
    return this.http.post(this.href + 'api/register', { data })
      .map((response: Response) => {
        let token = response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));
          localStorage.setItem('currentUserEmail', (<any>window).userEmail);
          localStorage.setItem('mode', String(response.json().type));
          if (localStorage.getItem('mode') == '1') {
            this.mode = 'user';
          } else {
            this.mode = 'teacher';
          }
          return true;
        } else {
          return false;
        }
      });
  }

  login(data: any): Observable<boolean> {
    return this.http.post(this.href + 'api/authenticate', { data })
      .map((response: Response) => {
        let token = response.json().token;
        console.log(response.json());
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));
          localStorage.setItem('currentUserEmail', response.json().user.email);
          localStorage.setItem('mode', String(response.json().user.type));
          return true;
        } else {
          return false;
        }
      })
      .catch((error: Response) => {
        return Observable.of(false)
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('mode');
  }
}