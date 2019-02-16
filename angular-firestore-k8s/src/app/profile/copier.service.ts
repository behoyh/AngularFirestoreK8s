import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import {Http, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CopierService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private http:Http) {

  }

public ForkParentRepository(authToken:string)
{
var headers = new Headers();
headers.append('Accept', 'application/vnd.github.v3+json');
headers.set('Authorization','token '+ authToken)

return this.http.post("https://api.github.com/repos/behoyh/AngularFirestoreK8s/forks",{}, {headers:headers})
}

  public SignInGithub() {
    var provider = new auth.GithubAuthProvider();
    provider.addScope('repo');

    provider.setCustomParameters({
      'allow_signup': 'true'
    });

    return this.afAuth.auth.signInWithPopup(provider);
  }

  public LinkToAccount(email, password, pendingCred) {
    // Get sign-in methods for this email.
    this.afAuth.auth.fetchSignInMethodsForEmail(email).then((methods) => {
      // Step 3.
      // If the user has several sign-in methods,
      // the first method in the list will be the "recommended" method to use.
      if (methods[0] === 'password') {
        // Asks the user his password.
        // In real scenario, you should handle this asynchronously.
        // TODO: Setup a extra feild with a password prompt to take in a password instead of hardcoded string.
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user:any) => {
          // Step 4a.
          return user.link(pendingCred);
        }).then(function () {
          // GitHub account successfully linked to the existing Firebase user.
          return;
        });
        return;
      }
    });
  };
}


