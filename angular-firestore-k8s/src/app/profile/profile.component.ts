import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { auth } from 'firebase';
import { ProfileService } from './profile.service';
import { MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { SetUser } from '../shared/app.actions';
import { AppState } from '../shared/app.state';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { CopierService } from './copier.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Select(AppState.getUserEmail) email$: Observable<string>
  @Select(AppState.getUserPicture) picture$: Observable<string>;
  displayName$:any='';
  parentRepo = "Ur Mom";
  @Select() router$;

  user: auth.UserCredential = { credential: null, user: null };
  GitHubLinked = false;
  GitHubUsername = '';
  GitHubAuthToken = '';

  constructor(private store: Store, public profileService: ProfileService, public copierService: CopierService, public snackBar: MatSnackBar) {

  }

  LoginGoogle() {
    this.profileService.SignInGoogle()
      .then(x => this.OAuthUser(x));
  }

  //Mishmitewaka
  OAuthUser(user: any): any {
    this.snackBar.open("Signed in " + user.displayName, "OKAY", { duration: 3000 })
  }
  logout() {
    this.profileService.SignOut();
    this.store.dispatch([
      new SetUser({
        uid: null,
        name: '',
        email: '',
        picture: ''
      }),
      new Navigate(['/'])
    ]);
  }

  public StepChanged(event: any) {

    if (event.selectedIndex == 2) {
      this.profileService.CreateUser("", this.GoogleAuthForm.controls.email.value, this.GoogleAuthForm.controls.confirmPassword.value)
        .then(x => this.UserLogin(x))
        .catch(x => this.onError(x))
    }
  }

  public UserLogin(user: auth.UserCredential) {
    user.user.updateProfile(
      {
        displayName: 'remoteUser.additionalUserInfo.profile.name',
        photoURL: 'remoteUser.additionalUserInfo.profile.picture'
      });
    this.store.dispatch([
      new SetUser(
        {
          uid: user.user.uid,
          name: user.user.displayName,
          email: user.user.email,
          picture: user.user.photoURL
        })
    ]);

    this.snackBar.open("Added User.", "OKAY", { duration: 3000 })
  }

  GoogleAuthForm = new FormGroup(
    {
      email: new FormControl,
      password: new FormControl,
      confirmPassword: new FormControl
    });

  ngOnInit() {
  }

  // https://docs.gitlab.com/ce/api/projects.html#fork-project
  public GitHubForkProject() {
    this.copierService.ForkParentRepository(this.GitHubAuthToken)
    .subscribe(x=>alert(JSON.stringify(x.json())),x=>alert(x));
  }

  public LinkGitHub() {
    this.copierService.SignInGithub().then((result: any) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      if (result.additionalUserInfo.providerId == "github.com")
      {
        debugger;
        this.GitHubLinked = true;
        this.GitHubUsername = result.additionalUserInfo.username;
        this.GitHubAuthToken = result.credential.accessToken
      }

    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      // An error happened.
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Step 2.
        // User's email already exists.
        // The pending GitHub credential.
        var pendingCred = error.credential;
        // The provider account's email address.
        var email = error.email;

        this.copierService.LinkToAccount(email, "{password here}",pendingCred);
      }

    });
  };

  private onError(error) {
    alert(error);
  }

}
