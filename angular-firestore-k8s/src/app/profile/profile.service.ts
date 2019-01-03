import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileModel } from './profile.model';
import * as sha from 'js-sha512';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
  }
  public SignInGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider().setCustomParameters({
      prompt: 'select_account'
    }));
  }

  public SignOut() {
    this.afAuth.auth.signOut();
  }

  public Login(email: string, password: string) {
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email,password);
  }

  public CreateUser(email: string, password: string) {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, sha.sha512(password));
  }
}
