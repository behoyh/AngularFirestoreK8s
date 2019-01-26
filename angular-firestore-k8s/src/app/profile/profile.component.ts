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



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Select(AppState.getUserEmail) email$: Observable<string>
  @Select(AppState.getUserPicture) picture$: Observable<string>;
  @Select() router$;

  user: auth.UserCredential = { credential: null, user: null };

  constructor(private store: Store, public profileService: ProfileService, public snackBar: MatSnackBar) {

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
        }),
      new Navigate(['/'])
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

  private onError(error) {
    alert(error);
  }

}
