import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { DialogsService } from '../../_services/dialogs/dialogs.service';
import { FriendsService } from '../../_services/friends/friends.service';
import { HomeworkService } from '../../_services/homework/homework.service';
import { LanguageService } from '../../_services/language/language.service';
import { SocketService } from '../../_services/socket/socket.service';
import { UserService } from '../../_services/user/user.service';


import {
  MatInputModule,
  MatTooltipModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: [],
  providers:
    [
      AuthenticationService,
      DialogsService,
      FriendsService,
      HomeworkService,
      LanguageService,
      SocketService,
      UserService
    ]
})
export class SharedModule { }
