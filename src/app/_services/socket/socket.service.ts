import { Injectable } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {

  private url = "http://scrawlless.me/";
  private socket;

  sendMessage(message, id) {
    this.socket.emit('/socket/reply.create', {
      data: {
        token: JSON.parse(localStorage.getItem('currentUser')).token,
        companionId: Number(id),
        reply: message
      }
    });
  }

  sendKey(i, j) {
    this.socket.emit('/socket/keySend', {
      data: {
        token: JSON.parse(localStorage.getItem('currentUser')).token,
        key: {
          i: i,
          j: j
        }
      }
    });
  }

  keyboard() {
    let observable = new Observable(observer => {
      this.socket.emit('/socket/phoneAuth', {
        data: {
          token: JSON.parse(localStorage.getItem('currentUser')).token
        }
      });
    })
    return observable;
  }

  chat() {
    let observable = new Observable(observer => {

      this.socket.on('online', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.userId,
            type: 'online'
          }
        ));
      });

      this.socket.on('offline', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.userId,
            type: 'offline'
          }
        ));
      });

      this.socket.on('newMessage', (data) => {
        observer.next(JSON.stringify(
          {
            reply: data.reply,
            companionId: data.companionId,
            type: 'message',
            time: data.time
          }
        ));
      });
    })
    return observable;
  }

  anyPage() {
    let observable = new Observable(observer => {

      this.socket.on('online', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.userId,
            type: 'online'
          }
        ));
      });

      this.socket.on('offline', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.userId,
            type: 'offline'
          }
        ));
      });

      this.socket.on('friendRequest', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.fromUserId,
            type: 'incomReq'
          }
        ));
      });

      this.socket.on('requestAccepted', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.fromUserId,
            type: 'acceptedReq'
          }
        ));
      });

      this.socket.on('newMessage', (data) => {
        observer.next(JSON.stringify(
          {
            reply: data.reply,
            companionId: data.from,
            type: 'message',
            time: data.time
          }
        ));
      });

    })
    return observable;
  }


  authorized() {
    let observable = new Observable(observer => {
      this.socket.emit('/socket/auth', {
        data: {
          token: JSON.parse(localStorage.getItem('currentUser')).token
        }
      });

      this.socket.on('notifOnline', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.userId,
            type: 'online'
          }
        ));
      });

      this.socket.on('notifOffline', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.userId,
            type: 'offline'
          }
        ));
      });

      this.socket.on('friendRequest', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.fromUserId,
            type: 'incomReq'
          }
        ));
      });

      this.socket.on('requestAccepted', (data) => {
        observer.next(JSON.stringify(
          {
            id: data.fromUserId,
            type: 'acceptedReq'
          }
        ));
      });

      this.socket.on('newMessage', (data) => {
        observer.next(JSON.stringify(
          {
            reply: data.reply,
            companionId: data.from,
            type: 'message',
            time: data.time
          }
        ));
      });

      this.socket.on('keyType', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  connect() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}

