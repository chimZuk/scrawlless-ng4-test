import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;

  mode = "user";

  language: any[] = [
    {
      reg: 'Регистрация',
      sign: 'Вход',
      name: 'Имя',
      sname: 'Фамилия',
      type: 'Тип',
      stud: 'Ученик',
      teach: 'Учитель',
      email: 'Email',
      pass: 'Пароль',
      log: 'Присоединиться',
      sup: 'Войти',
      snack: 'Регистрация будет открыта 20 июля 😄😊🎉\nПрисоединяйтесь к нашим сообществам 😁🌍☎',
      country: 'Страна',
      form: 'Класс',
      us: 'США',
      by: 'Беларусь',
      ru: 'Россия',
      ua: 'Украина',
      age: 'Возраст',
      avatar: 'Аватар',
      place: 'Место работы',
      subjects: 'Предметы',
      subject: 'Предмет',
      math: 'Математика',
      physics: 'Физика',
      chemistry: 'Химия',
      profile: 'Профиль',
      logout: 'Выйти',
      online: ' в сети',
      offline:' не в сети',
      incomReq: 'Запрос в друзья',
      acceptedReq: ' принял ваш запрос в друзья',
      message: 'Сообщение от пользователя ',
      open: 'Открыть',
      countColumn: 'Посчитать в столбик',
      selectedDigits: 'Выбранные числа:',
      reset: 'Сброс',
      saveList: 'Сохранить лист',
      sendToTeacher: 'Отправить учителю',
      count: 'Посчитать',
      addition: 'Сложение',
      subtraction: 'Вычитание',
      multiplication: 'Умножение',
      division: 'Деление',
      tasks: 'Задания',
      diary: 'Табель',
      diary2: 'Дневник',
      users: 'Пользователи',
      messages: 'Сообщения',
      devices: 'Устройства',
      height: 'Высота',
      journal: 'Журнал',
      pupils: 'Ученики',
      typeMessage: 'Введите сообщение',
      search: 'Поиск',
      searchTip: 'Воспользуйтесь поиском, чтобы создать диалог',
      created: 'Созданное',
      sent: 'Присланное',
      newList: 'Новый лист',
      done: 'Выполненное',
      students: 'Учащиеся',
      teachers: 'Учителя',
      friendTip: 'Воспользуйтесь поиском, чтобы найти друзей',
      teachTip: 'Воспользуйтесь поиском, чтобы найти учителей',
      friends: 'Мои друзья',
      incom: 'Входящие заявки',
      outg: 'Исходящие заявки',
      myTeachers: 'Мои учителя',
      chat: 'Чат',
      delFriend: 'Удалить из друзей',
      acceptReq: 'Подтвердить запрос',
      decline: 'Отклонить заявку',
      cancelReq: 'Отменить запрос',
      dialogs: 'Диалоги',
      edit: 'Редактировать',
      yes: 'Да',
      addFriend: 'Добавить в друзья',
      close: 'Закрыть',
      edProf: 'Редактировать профиль',
      typeReq: 'Начните вводить имя друга',
      forMobile: 'Для мобильных устройств',
      mobileTip: 'Вы можете использовать своё устройство как беспроводную клавиатуру',
      appTip: 'Мобильное приложение в стадии разработки...',
      openKeyboard: 'Открыть клавиатуру',
      delete: 'Удалить',
      description: 'Описание',
      exitnsave: 'Сохранить и выйти'
    },
    {
      reg: 'Sign up',
      sign: 'Sign in',
      name: 'First name',
      sname: 'Second name',
      type: 'Type',
      stud: 'Student',
      teach: 'Teacher',
      email: 'Email',
      pass: 'Password',
      log: 'Join',
      sup: 'Log in',
      snack: 'Registration will be opened on the 20th of July 😄😊🎉\nJoin our social networks communities 😁🌍☎',
      country: 'Country',
      form: 'Form',
      us: 'USA',
      by: 'Belarus',
      ru: 'Russia',
      ua: 'Ukraine',
      age: 'Age',
      avatar: 'Profile picture',
      place: 'Institution',
      subjects: 'Subjects',
      subject: 'Subject',
      math: 'Math',
      physics: 'Physics',
      chemistry: 'Chemistry',
      profile: 'Profile',
      logout: 'Sign out',
      online: ' is online',
      offline:' is offline',
      incomReq: 'Friend request',
      acceptedReq: ' accepted your friend request',
      message: 'New message from user ',
      open: 'Open',
      countColumn: 'Count with columns',
      selectedDigits: 'Selected numbers:',
      reset: 'Reset',
      saveList: 'Save sheet',
      sendToTeacher: 'Send to teacher',
      count: 'Count',
      addition: 'Addition',
      subtraction: 'Subtraction',
      multiplication: 'Multiplication',
      division: 'Division',
      tasks: 'Tasks',
      diary: 'Diary',
      diary2: 'Diary',
      users: 'Users',
      messages: 'Messages',
      devices: 'Devices',
      height: 'Height',
      journal: 'Journal',
      pupils: 'Students',
      typeMessage: 'Enter your message',
      search: 'Search',
      searchTip: 'Use the search to create a dialog',
      created: 'Created',
      sent: 'Sent',
      newList: 'New sheet',
      done: 'Done',
      students: 'Students',
      teachers: 'Teachers',
      friendTip: 'Use the search to find friends',
      teachTip: 'Use the search to find teachers',
      friends: 'My friends',
      incom: 'Incoming requests',
      outg: 'Outgoing requests',
      myTeachers: 'My teachers',
      chat: 'Chat',
      delFriend: 'Remove from friends',
      acceptReq: 'Confirm the request',
      decline: 'Reject request',
      cancelReq: 'Cancel request',
      dialogs: 'Dialogs',
      edit: 'Edit',
      yes: 'Yes',
      addFriend: 'Add as friend',
      close: 'Close',
      edProf: 'Edit profile',
      typeReq: "Enter friend's name",
      forMobile: 'For mobile devices',
      mobileTip: 'You can use your device as a wireless keyboard',
      appTip: 'Mobile app coming soon...',
      openKeyboard: 'Open keyboard',
      fMarksTip: 'Connect your teacher to earn marks',
      marksTip: 'Marks table will be added soon',
      delete: 'Delete',
      description: 'Description',
      exitnsave: 'Save and exit'
    }
  ]

  lang: any;

  subjects: any[];

  getLanguage: string = 'ru';

  setLanguage() {
    this.getLanguage = navigator.language;
  }

  constructor(private http: Http) {
    this.setLanguage();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    if (navigator.language == "ru") {
      this.lang = 0;
    } else {
      this.lang = 1;
    }
    this.subjects = [
      {
        id: 1,
        name: this.language[this.lang].math
      },
      {
        id: 2,
        name: this.language[this.lang].physics
      },
      {
        id: 3,
        name: this.language[this.lang].chemistry
      }
    ];
  }

  isInfo(): string {
    return localStorage.getItem("isInfo");
  }


  getUserInfo(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userInfo.read', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  updateUserInfo(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userInfo.update', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  readDialogs(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/dialogs.read', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  readDialog(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/dialog.read', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  createDialog(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/dialog.create', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }


  getConnectedUser(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/connectedUsers.read', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  addFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.create', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  acceptFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.accept', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  declineFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.decline', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  cancelRequest(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnectionRequest.cancel', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  deleteFriend(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/userConnection.delete', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
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

  getUserByID(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/user.read', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  searchUsers(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/findUsers', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  getLists(data: any): Observable<any> {
    return this.http.post('https://scrawlless.org/api/homeworkLists.read', { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  login(data: any): Observable<boolean> {
    return this.http.post('https://scrawlless.org/api/register', { data })
      .map((response: Response) => {
        let token = response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));
          localStorage.setItem('isInfo', '0');
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

  log(data: any): Observable<boolean> {
    return this.http.post('https://scrawlless.org/api/authenticate', { data })
      .map((response: Response) => {
        let token = response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));
          localStorage.setItem('isInfo', '0');
          localStorage.setItem('mode', String(response.json().user.type));
          return true;
        } else {
          return false;
        }
      });
  }


  listCreate(data: any): Observable<any> {
    var url;
    if (localStorage.getItem('mode') == '1') {
      url = 'https://scrawlless.org/api/homework.create'
    } else {
      url = 'https://scrawlless.org/api/task.create'
    }
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  hwRead(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/homeworks.read'

    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  tasksRead(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/tasks.read'
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  homeworkRead(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/homework.read'
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  taskRead(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/task.read'
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  saveHomework(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/homework.update '
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  saveTask(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/task.update'
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  sendToStudent(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/homeworkFromTeacher.create'
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  sendToTeacher(data: any): Observable<any> {
    var url;
    url = 'https://scrawlless.org/api/homework.send'
    return this.http.post(url, { data })
      .map((response: Response) => {
        let user = response.json();
        if (user) {
          return user;
        } else {
          return "Error";
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}