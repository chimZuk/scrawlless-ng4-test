import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../_services/authentication/authentication.service';
import { LanguageService } from '../../../_services/language/language.service';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  regEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  snameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  regPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private languageService: LanguageService
  ) {
    (<any>window).userEmail = null;
  }


  //region Variables

  loading = false;
  regloading = false;
  loginError: String = "";
  registerError: String = "";
  language: any = this.languageService.language;
  lang: number = this.languageService.lang;
  data: any;
  user: any = {
    firstName: '',
    lastName: '',
    type: '1',
    email: '',
    password: ''
  }
  loginData: any = {
    email: '',
    password: ''
  }
  types = [{
    code: '1',
    name: this.language[this.lang].stud
  },
  {
    code: '2',
    name: this.language[this.lang].teach
  }];

  landing: boolean = false;

  //endregion Variables


  //region Filed Validation

  invalidEmail = false;
  invalidPassword = false;
  invalidFirstName = false;
  invalidLastName = false;

  validationError: String;
  regValidationError: String;

  showValidationError(type) {
    this.regValidationError = this.validationError = "";
    if (this.invalidPassword) {
      this.regValidationError = this.validationError = "Пароль должен быть не меньше 6 символов <br /> Содержать хотя бы одну заглавную букву <br /> Содержать хотя бы одно число или спецсимвол"
    }
    if (this.invalidEmail) {
      this.regValidationError = this.validationError = "Некорректно введён email адрес."
    }
    if (this.invalidLastName) {
      this.regValidationError = "Некорректно введена Фамилия."
    }
    if (this.invalidFirstName) {
      this.regValidationError = "Некорректно введено Имя."
    }
    if (type == 'logPass' || type == 'logEmail') {
      if (this.invalidPassword) {
        this.regValidationError = this.validationError = "Пароль должен быть не меньше 6 символов <br /> Содержать хотя бы одну заглавную букву <br /> Содержать хотя бы одно число или спецсимвол"
      }
      if (this.invalidEmail) {
        this.regValidationError = this.validationError = "Некорректно введён email адрес."
      }
    }
  }

  validForm(type) {
    this.validationError = '';

    var email = new RegExp(`^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$`);
    var pass = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    var name = new RegExp(`^[a-zA-Zа-яёА-ЯЁ\-]{1,20}$`);

    switch (type) {
      case 'logPass':
        this.user.password = this.user.password.trim();
        if (pass.test(this.user.password) || this.user.password == '') {
          this.invalidPassword = false;
        } else {
          this.invalidPassword = true;
        }
        break;
      case 'logEmail':
        this.user.email = this.user.email.trim();
        this.user.email = this.user.email.substr(0).toLowerCase();
        (<any>window).userEmail = this.user.email;
        if (email.test(this.user.email) || this.user.email == '') {
          this.invalidEmail = false;
        } else {
          this.invalidEmail = true;
        }
        break;
      case 'pass':
        this.user.password = this.user.password.trim();
        if (pass.test(this.user.password) || this.user.password == '') {
          this.invalidPassword = false;
        } else {
          this.invalidPassword = true;
        }
        break;
      case 'email':
        this.user.email = this.user.email.trim();
        this.user.email = this.user.email.substr(0).toLowerCase();
        (<any>window).userEmail = this.user.email;
        if (email.test(this.user.email) || this.user.email == '') {
          this.invalidEmail = false;
        } else {
          this.invalidEmail = true;
        }
        break;
      case 'lastName':
        this.user.lastName = this.user.lastName.trim();
        this.user.lastName = this.user.lastName.charAt(0).toUpperCase() + this.user.lastName.substr(1).toLowerCase();
        if (name.test(this.user.lastName) || this.user.lastName == '') {
          this.invalidLastName = false;
        } else {
          this.invalidLastName = true;

        }
        break;
      case 'firstName':
        this.user.firstName = this.user.firstName.trim();
        this.user.firstName = this.user.firstName.charAt(0).toUpperCase() + this.user.firstName.substr(1).toLowerCase();
        if (name.test(this.user.firstName) || this.user.firstName == '') {
          this.invalidFirstName = false;
        } else {
          this.invalidFirstName = true;
        }
        break;

      default:
        break;
    }
    this.showValidationError(type);
  }

  isRegFormValid(): boolean {
    var test = true;
    this.regValidationError = this.validationError = '';

    var email = new RegExp(`^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$`);
    var pass = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    var name = new RegExp(`^[a-zA-Zа-яёА-ЯЁ\-]{1,20}$`);

    if (pass.test(this.user.password)) {
      this.invalidPassword = false;
    } else {
      this.regValidationError = this.validationError = "Пароль должен быть не меньше 6 символов <br /> Содержать хотя бы одну заглавную букву <br /> Содержать хотя бы одно число или спецсимвол"
      test = false;
      this.invalidPassword = true;
    }

    if (email.test(this.user.email)) {
      this.invalidEmail = false;
    } else {
      this.regValidationError = this.validationError = "Некорректно введён email адрес."
      test = false;
      this.invalidEmail = true;
    }

    if (name.test(this.user.lastName)) {
      this.invalidLastName = false;
    } else {
      this.regValidationError = "Некорректно введена Фамилия."
      test = false;
      this.invalidLastName = true;
    }

    if (name.test(this.user.firstName)) {
      this.invalidFirstName = false;
    } else {
      this.regValidationError = "Некорректно введено Имя."
      test = false;
      this.invalidFirstName = true;
    }

    return test;
  }

  isLogFormValid(): boolean {
    var test = true;
    this.regValidationError = this.validationError = '';

    var email = new RegExp(`^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$`);
    var pass = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (pass.test(this.user.password)) {
      this.invalidPassword = false;
    } else {
      this.regValidationError = this.validationError = "Пароль должен быть не меньше 6 символов <br /> Содержать хотя бы одну заглавную букву <br /> Содержать хотя бы одно число или спецсимвол"
      test = false;
      this.invalidPassword = true;
    }

    if (email.test(this.user.email)) {
      this.invalidEmail = false;
    } else {
      this.regValidationError = this.validationError = "Некорректно введён email адрес."
      test = false;
      this.invalidEmail = true;
    }

    return test;
  }

  //endregion Field Validation


  //region HTTP requests

  register() {
    this.regloading = true;
    if (this.isRegFormValid()) {
      this.authenticationService.register(this.user)
        .subscribe(result => {
          if (result === true) {
            this.router.navigate(['/dashboard']);
          } else {
            this.regloading = false;
          }
        });
    } else {
      this.regloading = false;
    }

  }

  login() {
    this.loginError = "";
    var data = {
      email: this.loginData.email,
      password: this.loginData.password
    };
    this.loading = true;
    this.authenticationService.login(data)
      .subscribe(result => {
        console.log(result);
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          if(result._body.indexOf("Wrong")) {
            this.loginError = this.language[this.lang].incorrectData;
            console.log(this.loginError)
          }
          this.loading = false;
        }
      });
  }

  //endregion HTTP requests


  ngOnInit() {
  }

}
