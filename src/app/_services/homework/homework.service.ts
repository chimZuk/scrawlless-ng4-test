import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class HomeworkService {

  constructor(private http: Http) { }

  listCreate(data: any): Observable<any> {
    var url;
    (localStorage.getItem('mode') == '1') ? url = 'https://scrawlless.org/api/homework.create' : url = 'https://scrawlless.org/api/task.create';

    return this.http.post(url, { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  deleteList(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/homework.delete', { data })
      .map((response: Response) => {
        let list = response.json();
        if (list) {
          return list;
        } else {
          return "Error";
        }
      });
  }

  getHomeworks(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/homeworks.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  getTasks(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/tasks.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  homeworkRead(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/homework.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  taskRead(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/task.read', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  saveHomework(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/homework.update', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  saveTask(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/task.update', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  sendToStudent(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/homeworkFromTeacher.create', { data })
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return data;
        } else {
          return "Error";
        }
      });
  }

  sendToTeacher(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/homework.send', { data })
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
