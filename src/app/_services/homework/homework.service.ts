
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { BaseHrefModule } from '../../_modules/base-href/base-href.module';


@Injectable()
export class HomeworkService {

  constructor(private http: Http, private basehref: BaseHrefModule) { }

  href: string = this.basehref.base;
  
  listCreate(data: any): Observable<any> {
    var url;
    (localStorage.getItem('mode') == '1') ? url = this.href + 'api/homework.create' : url = this.href + 'api/task.create';

    return this.http.post(url, { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  deleteList(data: any): Observable<any> {
    return this.http.post(this.href + 'api/homework.delete', { data }).pipe(
      map((response: Response) => {
        let list = response.json();
        if (list) {
          return list;
        } else {
          return "Error";
        }
      }));
  }

  getHomeworks(data: any): Observable<any> {
    return this.http.post(this.href + 'api/homeworks.inSchedule.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  getRawHomeworks(data: any): Observable<any> {
    return this.http.post(this.href + 'api/homeworks.byUser.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  getTasks(data: any): Observable<any> {
    return this.http.post(this.href + 'api/tasks.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  homeworkRead(data: any): Observable<any> {
    return this.http.post(this.href + 'api/homework.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  taskRead(data: any): Observable<any> {
    return this.http.post(this.href + 'api/task.read', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  saveHomework(data: any): Observable<any> {
    return this.http.post(this.href + 'api/homework.update', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  saveTask(data: any): Observable<any> {
    return this.http.post(this.href + 'api/task.update', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  sendToStudent(data: any): Observable<any> {
    return this.http.post(this.href + 'api/homeworkFromTeacher.create', { data }).pipe(
      map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      }));
  }

  sendToTeacher(data: any): Observable<any> {
    return this.http.post(this.href + 'api/homework.send', { data }).pipe(
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
