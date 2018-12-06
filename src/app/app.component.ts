import { Component } from '@angular/core';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
const config = {
    apiKey: "AIzaSyD-WhW9Qz5eYpN1q06ugKtszk3RESdvvaQ",
    authDomain: "danneis2019.firebaseapp.com",
    databaseURL: "https://danneis2019.firebaseio.com",
    projectId: "danneis2019",
    storageBucket: "danneis2019.appspot.com",
    messagingSenderId: "34105080485"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular6-firestore';

  ngOnInit() {
    firebase.initializeApp(config);
    firebase.firestore().settings(settings);
  }
}