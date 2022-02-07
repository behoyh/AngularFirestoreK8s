import { Injectable } from '@angular/core';
import { getAuth, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { Firestore, collectionData, collection, getDoc, doc } from '@angular/fire/firestore';
import * as sha from 'js-sha512';
import { Store } from '@ngxs/store';
import { SetUser } from '../shared/app.actions';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private store: Store, private db: Firestore) {
    var afAuth = getAuth();
    afAuth.onAuthStateChanged(user => {
      if (user) {
        this.store.dispatch([
          new SetUser(
            {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              picture: user.photoURL
            })
        ]);
      }
    });
  }

  public SignInGoogle() {
    return signInWithPopup(getAuth(), new GoogleAuthProvider().setCustomParameters({
      prompt: 'select_account'
    }));
  }

  public SignOut() {
    getAuth().signOut();
  }

  public Login(email: string, password: string) {
    return createUserWithEmailAndPassword(getAuth(), email, password);
  }

  public CreateUser(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(getAuth(), email, sha.sha512(password));
  }

  public GetUser(id: string) {
    var user = collection(this.db, 'users');
    return getDoc(doc(user,id));
  }
}
