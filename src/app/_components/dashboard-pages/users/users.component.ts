import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

import { Router } from '@angular/router';

import { AuthenticationService } from '../../../_services/authentication.service';
import { SocketService } from '../../../_services/socket.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private socket: SocketService, public config: MatDialogConfig, private authenticationService: AuthenticationService) { }

    name;

    user: any;
    users: any;
    language: any = this.authenticationService.language;
    lang: number = this.authenticationService.lang;
  
    teachers: any = {
      accepted: [],
      incomReq: [],
      outcomReq: []
    };
  
    students: any = {
      accepted: [],
      incomReq: [],
      outcomReq: []
    }
  
    loading: boolean = true;
  
    openChat(id: number) {
  
    }
  
    online(id) {
      return false;
    }
  
    searchDialog() {
      this.openDialog();
    }
  
    createDialog(id: number) {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token,
        companionId: Number(id)
      }
      this.loading = true;
      this.authenticationService.createDialog(data)
        .subscribe(result => {
          this.loading = false;
          this.router.navigate(['dashboard/im', id]);
        });
    }
  
    openDialog() {
      /*let dialogRef = this.dialog.open(SearchUsersDialogComponent, {
        disableClose: true,
        panelClass: 'transparent-dialog'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getConnectedUser();
      });*/
    }
  
    viewProfileDialog(id, status) {
      /*this.config.disableClose = true;
      this.config.data = {
        id: id,
        friendStatus: status
      }
      this.config.panelClass = 'transparent-dialog';
      let dialogRef = this.dialog.open(ProfileViewDialogComponent, this.config);
      dialogRef.afterClosed().subscribe(result => {
        this.getConnectedUser();
      });*/
    }
  
    getUserInfo() {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token
      }
      this.loading = true;
      this.authenticationService.getUserInfo(data)
        .subscribe(result => {
          this.user = result;
          this.loading = false;
        });
    }
  
    friendStatus(res): number {
      for (var i = 0; i < this.users.length; i++) {
        if (res == this.users[i].id) {
          return 1;
        }
      }
      if (res == this.user.id) {
        return 2
      } else {
        return 0;
      }
    }
  
    getUserByID(id) {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token,
        id: id
      }
      this.loading = true;
      this.authenticationService.getUserByID(data)
        .subscribe(result => {
          this.loading = false;
        });
    }
  
    getConnectedUser() {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token
      }
      this.loading = true;
      this.teachers = {
        accepted: [],
        incomReq: [],
        outcomReq: []
      };
  
      this.students = {
        accepted: [],
        incomReq: [],
        outcomReq: []
      };
      this.authenticationService.getConnectedUser(data)
        .subscribe(result => {
          this.users = result;
          this.users.accepted.forEach(user => {
            if (user.type == 1) {
              this.students.accepted.push(user);
            } else {
              if (user.type == 2) {
                this.teachers.accepted.push(user);
              }
            }
          });
          this.users.incomReq.forEach(user => {
            if (user.type == 1) {
              this.students.incomReq.push(user);
            } else {
              if (user.type == 2) {
                this.teachers.incomReq.push(user);
              }
            }
          });
          this.users.outcomReq.forEach(user => {
            if (user.type == 1) {
              this.students.outcomReq.push(user);
            } else {
              if (user.type == 2) {
                this.teachers.outcomReq.push(user);
              }
            }
          });
          console.log(this.students);
          console.log(this.teachers);
          this.loading = false;
        });
    }
  
    acceptFriend(userId) {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token,
        userId: userId
      }
      this.loading = true;
      this.authenticationService.acceptFriend(data)
        .subscribe(result => {
          this.getConnectedUser();
        });
    }
  
    declineFriend(userId) {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token,
        userId: userId
      }
      this.loading = true;
      this.authenticationService.declineFriend(data)
        .subscribe(result => {
          this.getConnectedUser();
        });
    }
  
    cancelRequest(userId) {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token,
        userId: userId
      }
      this.loading = true;
      this.authenticationService.cancelRequest(data)
        .subscribe(result => {
          this.getConnectedUser();
        });
    }
  
    deleteFriend(userId) {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let data = {
        token: token,
        userId: userId
      }
      this.loading = true;
      this.authenticationService.deleteFriend(data)
        .subscribe(result => {
          this.getConnectedUser();
        });
    }
  
    connection: any;
  
    setOnline(id, status) {
  
      try {
        if (id != this.user.id) {
          for (var i = 0; i < this.users.incomReq.length; i++) {
            if (id == this.users.incomReq[i].id) {
              this.users.incomReq[i].onlineStatus = status;
            }
          }
          for (var i = 0; i < this.users.outcomReq.length; i++) {
            if (id == this.users.outcomReq[i].id) {
              this.users.outcomReq[i].onlineStatus = status;
            }
          }
          for (var i = 0; i < this.users.accepted.length; i++) {
            if (id == this.users.accepted[i].id) {
              this.users.accepted[i].onlineStatus = status;
            }
          }
        }
      } catch (error) {
  
      }
  
    }
  
    ngOnInit() {
      this.getUserInfo();
      this.getConnectedUser();
  
     /* this.connection = this.socket.anyPage().subscribe(data => {
        var result = JSON.parse(String(data));
  
  
        switch (result.type) {
          case 'online': {
            this.setOnline(result.id, true);
            break;
          }
  
          case 'offline': {
            this.setOnline(result.id, false);
            break;
          }
  
          case 'incomReq': {
            this.getConnectedUser();
            break;
          }
  
          case 'acceptedReq': {
            this.getConnectedUser();
            break;
          }
  
          default:
            break;
        }
  
  
      })*/
    }
  
    ngOnDestroy() {
      //this.connection.unsubscribe();
    }

}