import { Injectable } from '@angular/core'

import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'

import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  ref = firebase.firestore().collection('boards');

  constructor() {
  }

  getBoards():  Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            key: data.listNum,
            Name: data.Name,
            Email: data.Email,
            Phone: data.Phone
          });
        });
        observer.next(boards);
      });
    });
  }

  getBoard(listNum: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(listNum).get().then((doc) => {
        let data = doc.data();
        observer.next({
           key: data.listNum,
            Name: data.Name,
            Email: data.Email,
            Phone: data.Phone
        });
      });
    });
  }
  postBoard(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: data.listNum,
        });
      });
    });
  }

  updateBoards(listNum: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(listNum).set(data).then(() => {
        observer.next();
      });
    });
  }
  deleteBoards(listNum: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(listNum).delete().then(() => {
        observer.next();
      });
    });
  }

  constructor() { }
}
