import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) {
  }
  login() {
    var result = this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    debugger;
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  GoogleAuthForm = new FormGroup(
    {
      username: new FormControl,
      password: new FormControl
    });

  ngOnInit() {
  }

}
