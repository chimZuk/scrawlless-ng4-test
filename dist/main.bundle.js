webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_components/pages/index/index.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/assets/css/index.css"), "");
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Exo+2);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Itim);", ""]);

// module
exports.push([module.i, ".back {\r\n  position: absolute;\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/img/back.png") + ");\r\n  background-size: cover;\r\n  z-index: 2;\r\n  width: 84%;\r\n  min-height: 100%;\r\n  padding: 0 8%;\r\n  background-position-x: center; }\r\n\r\n.logo {\r\n  background-image: url(" + __webpack_require__("../../../../../src/assets/img/back.gif") + ");\r\n  background-size: cover;\r\n  z-index: 1;\r\n  width: 318px;\r\n  height: 108px;\r\n  float: right; }\r\n\r\n.content {\r\n  width: 100%;\r\n  position: relative;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap; }\r\n\r\n.video {\r\n  width: 100%;\r\n  height: 100%; }\r\n\r\n.video-content {\r\n  width: 40vw;\r\n  height: 22.5vw;\r\n  -webkit-box-flex: 2;\r\n      -ms-flex: 2;\r\n          flex: 2;\r\n  margin: 0px 5px 5px 0px; }\r\n\r\n.auth {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1;\r\n          flex: 1;\r\n  min-width: 248px;\r\n  max-width: 280px; }\r\n\r\n.footer {\r\n  height: 100%;\r\n  padding: 10px !important; }\r\n\r\n.icon {\r\n  width: 40px;\r\n  height: 40px; }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/_components/pages/index/index.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"back\">\n    <div class=\"logo\"></div>\n    <div class=\"content\">\n        <md-card class=\"video-content\">\n            <iframe class=\"video\" src=\"https://www.youtube.com/embed/nNXGbQ_rubQ\" frameborder=\"0\" allowfullscreen></iframe>\n        </md-card>\n        <md-tab-group class=\"auth\">\n            <md-tab [label]=\"language[lang].reg\">\n                <form>\n                    <md-input-container>\n                        <input mdInput [placeholder]=\"language[lang].name\" [(ngModel)]=\"user.firstName\" name=\"first\" value=\"\">\n                    </md-input-container>\n                    <md-input-container>\n                        <input mdInput [placeholder]=\"language[lang].sname\" [(ngModel)]=\"user.lastName\" name=\"last\" value=\"\">\n                    </md-input-container>\n                    <md-input-container>\n                        <input type=\"email\" mdInput [placeholder]=\"language[lang].email\" [(ngModel)]=\"user.email\" name=\"mail\" value=\"\">\n                    </md-input-container>\n                    <md-input-container>\n                        <input type=\"password\" mdInput [placeholder]=\"language[lang].pass\" [(ngModel)]=\"user.password\" name=\"pass\" value=\"\">\n                    </md-input-container>\n                </form>\n                <button md-fab [mdTooltip]=\"language[lang].log\" mdTooltipPosition=\"left\" (click)=\"login()\"><md-icon>create</md-icon></button>\n            </md-tab>\n            <md-tab [label]=\"language[lang].sign\">\n                <form>\n                    <md-input-container>\n                        <input type=\"text\" mdInput [placeholder]=\"language[lang].email\" [(ngModel)]=\"user.email\" name=\"mail\" value=\"\">\n                    </md-input-container>\n                    <md-input-container>\n                        <input type=\"password\" mdInput [placeholder]=\"language[lang].pass\" [(ngModel)]=\"user.password\" name=\"pass\" value=\"\">\n                    </md-input-container>\n                    <button md-fab [mdTooltip]=\"language[lang].sup\" mdTooltipPosition=\"left\" (click)=\"log()\"><md-icon>forward</md-icon></button>\n                </form>\n            </md-tab>\n        </md-tab-group>\n    </div>\n    <md-card class=\"footer\">\n        <a href=\"https://vk.com/scrawlless\" target=\"_blank\">\n            <button md-button>\n                        <img class=\"icon\" src=\"../../../assets/img/vk.svg\" alt=\"VK\">\n                    </button>\n        </a>\n        <a href=\"https://facebook.com/scrawlless/\" target=\"_blank\">\n            <button md-button>\n                        <img class=\"icon\" src=\"../../../assets/img/facebook.svg\" alt=\"Facebook\">\n                    </button>\n        </a>\n        <a href=\"https://ok.ru/group/53562840252602\" target=\"_blank\">\n            <button md-button>\n                        <img class=\"icon\" src=\"../../../assets/img/ok.svg\" alt=\"OK.ru\">\n                    </button>\n        </a>\n    </md-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/_components/pages/index/index.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndexComponent = (function () {
    function IndexComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.language = this.authenticationService.language;
        this.lang = this.authenticationService.lang;
        this.user = {
            firstName: '',
            lastName: '',
            type: '',
            email: '',
            password: ''
        };
        this.types = [{
                code: '1',
                name: this.language[this.lang].stud
            },
            {
                code: '2',
                name: this.language[this.lang].teach
            }];
        this.lang = this.authenticationService.lang;
    }
    IndexComponent.prototype.login = function () {
        var _this = this;
        console.log(this.user);
        this.loading = true;
        this.authenticationService.login(this.user)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/dashboard']);
            }
            else {
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        });
    };
    IndexComponent.prototype.log = function () {
        var _this = this;
        var data = {
            email: this.user.email,
            password: this.user.password
        };
        this.loading = true;
        this.authenticationService.log(data)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/dashboard']);
                //location.reload();
            }
            else {
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        });
    };
    IndexComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/dashboard']);
    };
    return IndexComponent;
}());
IndexComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-index',
        template: __webpack_require__("../../../../../src/app/_components/pages/index/index.component.html"),
        styles: [__webpack_require__("../../../../../src/app/_components/pages/index/index.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object])
], IndexComponent);

var _a, _b;
//# sourceMappingURL=index.component.js.map

/***/ }),

/***/ "../../../../../src/app/_services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.mode = "user";
        this.language = [
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
                typeReq: 'Введите запрос',
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
                typeReq: 'Enter the query',
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
        ];
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (navigator.language == "ru") {
            this.lang = 0;
        }
        else {
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
    AuthenticationService.prototype.isInfo = function () {
        return localStorage.getItem("isInfo");
    };
    AuthenticationService.prototype.getUserInfo = function (data) {
        return this.http.post('https://scrawlless.org/api/userInfo.read', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.updateUserInfo = function (data) {
        return this.http.post('https://scrawlless.org/api/userInfo.update', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.readDialogs = function (data) {
        return this.http.post('https://scrawlless.org/api/dialogs.read', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.readDialog = function (data) {
        return this.http.post('https://scrawlless.org/api/dialog.read', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.createDialog = function (data) {
        return this.http.post('https://scrawlless.org/api/dialog.create', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.getConnectedUser = function (data) {
        return this.http.post('https://scrawlless.org/api/connectedUsers.read', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.addFriend = function (data) {
        return this.http.post('https://scrawlless.org/api/userConnection.create', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.acceptFriend = function (data) {
        return this.http.post('https://scrawlless.org/api/userConnection.accept', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.declineFriend = function (data) {
        return this.http.post('https://scrawlless.org/api/userConnection.decline', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.cancelRequest = function (data) {
        return this.http.post('https://scrawlless.org/api/userConnectionRequest.cancel', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.deleteFriend = function (data) {
        return this.http.post('https://scrawlless.org/api/userConnection.delete', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.deleteList = function (data) {
        return this.http.post('https://scrawlless.org/api/homework.delete', { data: data })
            .map(function (response) {
            var list = response.json();
            if (list) {
                return list;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.getUserByID = function (data) {
        return this.http.post('https://scrawlless.org/api/user.read', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.searchUsers = function (data) {
        return this.http.post('https://scrawlless.org/api/findUsers', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.getLists = function (data) {
        return this.http.post('https://scrawlless.org/api/homeworkLists.read', { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.login = function (data) {
        var _this = this;
        return this.http.post('https://scrawlless.org/api/register', { data: data })
            .map(function (response) {
            var token = response.json().token;
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ token: token }));
                localStorage.setItem('isInfo', '0');
                localStorage.setItem('mode', String(response.json().type));
                if (localStorage.getItem('mode') == '1') {
                    _this.mode = 'user';
                }
                else {
                    _this.mode = 'teacher';
                }
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.log = function (data) {
        var _this = this;
        return this.http.post('https://scrawlless.org/api/authenticate', { data: data })
            .map(function (response) {
            var token = response.json().token;
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ token: token }));
                localStorage.setItem('isInfo', '0');
                localStorage.setItem('mode', String(response.json().user.type));
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.listCreate = function (data) {
        var url;
        if (localStorage.getItem('mode') == '1') {
            url = 'https://scrawlless.org/api/homework.create';
        }
        else {
            url = 'https://scrawlless.org/api/task.create';
        }
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.hwRead = function (data) {
        var url;
        url = 'https://scrawlless.org/api/homeworks.read';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.tasksRead = function (data) {
        var url;
        url = 'https://scrawlless.org/api/tasks.read';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.homeworkRead = function (data) {
        var url;
        url = 'https://scrawlless.org/api/homework.read';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.taskRead = function (data) {
        var url;
        url = 'https://scrawlless.org/api/task.read';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.saveHomework = function (data) {
        var url;
        url = 'https://scrawlless.org/api/homework.update ';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.saveTask = function (data) {
        var url;
        url = 'https://scrawlless.org/api/task.update';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.sendToStudent = function (data) {
        var url;
        url = 'https://scrawlless.org/api/homeworkFromTeacher.create';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.sendToTeacher = function (data) {
        var url;
        url = 'https://scrawlless.org/api/homework.send';
        return this.http.post(url, { data: data })
            .map(function (response) {
            var user = response.json();
            if (user) {
                return user;
            }
            else {
                return "Error";
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], AuthenticationService);

var _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/_services/socket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SocketService = (function () {
    function SocketService() {
        this.url = 'https://scrawlless.com';
    }
    SocketService.prototype.sendMessage = function (message, id) {
        this.socket.emit('/socket/reply.create', {
            data: {
                token: JSON.parse(localStorage.getItem('currentUser')).token,
                companionId: Number(id),
                reply: message
            }
        });
    };
    SocketService.prototype.sendKey = function (i, j) {
        this.socket.emit('/socket/keySend', {
            data: {
                token: JSON.parse(localStorage.getItem('currentUser')).token,
                key: {
                    i: i,
                    j: j
                }
            }
        });
    };
    SocketService.prototype.keyboard = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.emit('/socket/phoneAuth', {
                data: {
                    token: JSON.parse(localStorage.getItem('currentUser')).token
                }
            });
        });
        return observable;
    };
    SocketService.prototype.chat = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('online', function (data) {
                observer.next(JSON.stringify({
                    id: data.userId,
                    type: 'online'
                }));
            });
            _this.socket.on('offline', function (data) {
                observer.next(JSON.stringify({
                    id: data.userId,
                    type: 'offline'
                }));
            });
            _this.socket.on('newMessage', function (data) {
                observer.next(JSON.stringify({
                    reply: data.reply,
                    companionId: data.companionId,
                    type: 'message',
                    time: data.time
                }));
            });
        });
        return observable;
    };
    SocketService.prototype.anyPage = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('online', function (data) {
                observer.next(JSON.stringify({
                    id: data.userId,
                    type: 'online'
                }));
            });
            _this.socket.on('offline', function (data) {
                observer.next(JSON.stringify({
                    id: data.userId,
                    type: 'offline'
                }));
            });
            _this.socket.on('friendRequest', function (data) {
                observer.next(JSON.stringify({
                    id: data.fromUserId,
                    type: 'incomReq'
                }));
            });
            _this.socket.on('requestAccepted', function (data) {
                observer.next(JSON.stringify({
                    id: data.fromUserId,
                    type: 'acceptedReq'
                }));
            });
            _this.socket.on('newMessage', function (data) {
                observer.next(JSON.stringify({
                    reply: data.reply,
                    companionId: data.from,
                    type: 'message',
                    time: data.time
                }));
            });
        });
        return observable;
    };
    SocketService.prototype.authorized = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.emit('/socket/auth', {
                data: {
                    token: JSON.parse(localStorage.getItem('currentUser')).token
                }
            });
            _this.socket.on('notifOnline', function (data) {
                observer.next(JSON.stringify({
                    id: data.userId,
                    type: 'online'
                }));
            });
            _this.socket.on('notifOffline', function (data) {
                observer.next(JSON.stringify({
                    id: data.userId,
                    type: 'offline'
                }));
            });
            _this.socket.on('friendRequest', function (data) {
                observer.next(JSON.stringify({
                    id: data.fromUserId,
                    type: 'incomReq'
                }));
            });
            _this.socket.on('requestAccepted', function (data) {
                observer.next(JSON.stringify({
                    id: data.fromUserId,
                    type: 'acceptedReq'
                }));
            });
            _this.socket.on('newMessage', function (data) {
                observer.next(JSON.stringify({
                    reply: data.reply,
                    companionId: data.from,
                    type: 'message',
                    time: data.time
                }));
            });
            _this.socket.on('keyType', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    SocketService.prototype.connect = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__(_this.url);
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    return SocketService;
}());
SocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], SocketService);

//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pages_index_index_component__ = __webpack_require__("../../../../../src/app/_components/pages/index/index.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__components_pages_index_index_component__["a" /* IndexComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_3__components_pages_index_index_component__["a" /* IndexComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */]
        ],
        declarations: []
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/assets/css/app.css"), "");

// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_pages_index_index_component__ = __webpack_require__("../../../../../src/app/_components/pages/index/index.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_socket_service__ = __webpack_require__("../../../../../src/app/_services/socket.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_pages_index_index_component__["a" /* IndexComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MdTooltipModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MdCardModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MdMenuModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MdTabsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MdInputModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_10__services_socket_service__["a" /* SocketService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/assets/img/back.gif":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "back.dde5f0e65936d152f51b.gif";

/***/ }),

/***/ "../../../../../src/assets/img/back.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "back.1b49b995050022b7af06.png";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/assets/css/app.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Exo+2);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Itim);", ""]);

// module
exports.push([module.i, "/* Begining of tabs reset */\r\n/deep/ .mat-tab-list {\r\n  margin-left: 20px !important; }\r\n\r\n/deep/ .mat-tab-label {\r\n  min-width: 0px !important;\r\n  border-radius: 5px 5px 0px 0px !important;\r\n  margin-right: 2px !important;\r\n  font-size: 19px !important;\r\n  padding: 0px 12px !important;\r\n  opacity: 0.6 !important; }\r\n\r\n/deep/ .mat-tab-label-active {\r\n  opacity: 1 !important; }\r\n\r\n/deep/ .mat-ink-bar {\r\n  height: 0 !important;\r\n  visibility: hidden !important; }\r\n\r\n/deep/ .mat-tab-header {\r\n  border: 0 !important; }\r\n\r\n/deep/ .mat-tab-body-content {\r\n  overflow: hidden !important;\r\n  padding: 0px 24px 24px 24px !important; }\r\n\r\n/deep/ .mat-tab-body-wrapper {\r\n  border-radius: 5px !important; }\r\n\r\n/* End of tabs reset */\r\n/* Begining of card reset */\r\n/deep/ .mat-card {\r\n  border-radius: 5px !important;\r\n  padding: 20px !important; }\r\n\r\n/* End of card reset */\r\n/* Begining of button reset */\r\n/deep/ button {\r\n  min-width: 0 !important;\r\n  line-height: auto !important;\r\n  padding: 0 !important;\r\n  -ms-flex-line-pack: center !important;\r\n      align-content: center !important;\r\n  -webkit-box-pack: center !important;\r\n      -ms-flex-pack: center !important;\r\n          justify-content: center !important; }\r\n\r\n/* End of button reset */\r\n/* Begining of input reset */\r\n/deep/ .mat-form-field {\r\n  width: 100% !important; }\r\n\r\n/* End of input reset */\r\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/assets/css/index.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Exo+2);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Itim);", ""]);

// module
exports.push([module.i, "/deep/ .mat-tab-label {\r\n  background-color: #ffffff !important; }\r\n\r\n/deep/ .mat-tab-body-wrapper {\r\n  background-color: #ffffff !important; }\r\n", ""]);

// exports


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map