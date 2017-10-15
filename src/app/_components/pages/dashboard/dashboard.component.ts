import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

import { LanguageService } from '../../../_services/language/language.service';
import { SocketService } from '../../../_services/socket/socket.service';
import { UserService } from '../../../_services/user/user.service';

import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';

import { DatePipe } from '@angular/common';

//import { ProfileViewDialogComponent } from '../../dialogs/profile-view-dialog/profile-view-dialog.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MatDialogConfig, DatePipe],
})
export class DashboardComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public config: MatDialogConfig,
    public snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private languageService: LanguageService,
    private socket: SocketService,
    private userService: UserService,
    public datePipe: DatePipe
  ) { }

  mydate = new Date();
  ngOnInit() {
    this.getUserInfo()
    /*this.connection = this.socket.authorized().subscribe(data => {
      var result = JSON.parse(String(data));
      switch (result.type) {
        case 'online': {
          this.openSnackBar(result);
          break;
        }
 
        case 'offline': {
          this.openSnackBar(result);
          break;
        }
 
        case 'incomReq': {
          this.openSnackBar(result);
          break;
        }
 
        case 'acceptedReq': {
          this.openSnackBar(result);
          break;
        }
 
        case 'message': {
          var sendData = {
            type: result.type,
            id: result.companionId
          }
          this.openSnackBar(sendData);
          break;
        }
 
        default:
          break;
      }
    })*/
  }

  getUserByID(id) {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let data = {
      token: token,
      id: id
    }
    this.loading = true;
    this.userService.getUserByID(data)
      .subscribe(result => {
        this.loading = false;
        return result;
      });
  }


  openSnackBar(data) {
    var name, message, action, duration;
    try {
      if ((Number(data.id) != Number(this.user.id) && data.type != 'message') || (data.type == 'message' && Number(data.id) != Number(this.user.id))) {
        let token = JSON.parse(localStorage.getItem('currentUser')).token;
        let sendData = {
          token: token,
          id: String(data.id)
        }
        this.userService.getUserByID(sendData)
          .subscribe(result => {
            name = result.firstName + ' ' + result.lastName;
            if (data.type == 'online') {
              message = name + this.language[this.lang].online + ' 😄';
              action = '';
              duration = 3000;
            } else {
              if (data.type == 'offline') {
                message = name + this.language[this.lang].offline + ' 😴';
                action = '';
                duration = 3000;
              } else {
                if (data.type == 'incomReq') {
                  message = this.language[this.lang].incomReq + ' 😺\n' + name;
                  action = this.language[this.lang].open;
                  duration = 10000;
                } else {
                  if (data.type == 'acceptedReq') {
                    message = name + this.language[this.lang].acceptedReq + ' ✔️';
                    action = this.language[this.lang].open;
                    duration = 10000;
                  } else {
                    if (data.type == 'message') {
                      message = this.language[this.lang].message + name + ' 💬';
                      action = this.language[this.lang].open;
                      duration = 10000;
                    }
                  }
                }
              }
            }

            if (this.location.path().indexOf('/dashboard/im') == -1 && data.type == 'message') {
              this.snackBar.open(message, action, {
                duration: duration,
              }).onAction().subscribe(result => {
                switch (data.type) {
                  case 'message': {
                    this.router.navigate(['dashboard/im', data.id]);
                    break;
                  }
                  default:
                    break;
                }
              });
            }


            if (this.location.path().indexOf('/dashboard/users') == -1 && data.type != 'message') {
              this.snackBar.open(message, action, {
                duration: duration,
              }).onAction().subscribe(result => {
                switch (data.type) {
                  case 'incomReq': {
                    //this.viewProfileDialog(String(data.id), 0);
                    break;
                  }

                  case 'acceptedReq': {
                    //this.viewProfileDialog(String(data.id), 2);
                    break;
                  }

                  default:
                    break;
                }
              });
            }

          });
      }
    } catch (error) {

    }
  }


  ngOnDestroy() {
    //this.connection.unsubscribe();
  }


  selectedOption: string;
  mode: number = Number(localStorage.getItem('mode'));
  isInfo: boolean = true;
  loading: boolean = false;

  language: any = this.languageService.language;
  lang: number = this.languageService.lang;

  user: any;
  connection: any;

  getUserInfo() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let data = {
      token: token
    }
    this.loading = true;
    this.userService.getUserInfo(data)
      .subscribe(result => {
        this.user = result;
        this.loading = false;
      });
  }

  /*openDialog() {
    this.config.disableClose = true;
    let dialogRef = this.dialog.open(LearnMoreDialogComponent, this.config);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
 
  viewProfileDialog(id, status) {
    this.config.disableClose = true;
    this.config.data = {
      id: id,
      friendStatus: status,
      isCurrent: true
    }
    this.config.panelClass = 'transparent-dialog';
    let dialogRef = this.dialog.open(ProfileViewDialogComponent, this.config);
    dialogRef.afterClosed().subscribe(result => {
 
    });
  }
 
  logOut() {
    this.connection.unsubscribe();
    this.authenticationService.logout();
  }*/

}
