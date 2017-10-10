import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  constructor() {
    this.setLanguage();
  }

  lang: any;
  getLanguage: string;

  setLanguage() {
    this.getLanguage = navigator.language;
    (navigator.language == "ru") ? this.lang = 0 : this.lang = 1;
  }

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
      incorrectData: 'Неправильно введены email и/или пароль.',
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
      offline: ' не в сети',
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
      searchFriend: 'Начните вводить имя друга',
      searchTeacher: "Начните вводить имя учителя",
      searchStudent: "Начните вводить имя ученика",
      searchUser: "Начните вводить имя пользователя",
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
      incorrectData: 'Incorrect email or/and password.',
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
      offline: ' is offline',
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
      searchFriend: "Enter friend's name",
      searchTeacher: "Enter teacher's name",
      searchStudent: "Enter student's name",
      searchUser: "Enter user's name",
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
}
