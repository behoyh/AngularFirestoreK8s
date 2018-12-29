import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth} from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileModel } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {
  }
  public SignIn()
  {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider().setCustomParameters({
      prompt: 'select_account'
    }));
  }

  public SignOut()
  {
    this.afAuth.auth.signOut();
  }

  public CreateUser(user:any)
  {
    var data: ProfileModel = 
    {
      uid: user.profile.id,
      name: user.profile.name,
      email: user.profile.email,
      picture: user.profile.picture
    };

    var postsRef = this.db.collection("users");
    return postsRef.doc(data.uid).set({
      ...data
    });
  }
}
