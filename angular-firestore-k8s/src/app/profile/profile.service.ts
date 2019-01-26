import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import * as sha from 'js-sha512';
import { Store } from '@ngxs/store';
import { SetUser } from '../shared/app.actions';
import { Navigate } from '@ngxs/router-plugin';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private store: Store, private db: AngularFirestore, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch([
          new SetUser(
            {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              picture: user.photoURL
            }),
          new Navigate(['/'])
        ]);
      }
    });
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
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  public CreateUser(name: string, email: string, password: string) {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, sha.sha512(password));
  }

  public GetUser(id: string) {
    return this.db.collection('users').doc(id);
  }
}
