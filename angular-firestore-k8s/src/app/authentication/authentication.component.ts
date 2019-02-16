import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { Store, Select } from '@ngxs/store';
import { SetUser } from '../shared/app.actions';
import { MatSnackBar } from '@angular/material';
import { Navigate } from '@ngxs/router-plugin';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  @Select() app$;
  @Select() router$;

  public user: any;

  constructor(private store: Store, private service: ProfileService, private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  public Login() {
    this.service.Login(this.LoginAuthForm.controls.email.value, this.LoginAuthForm.controls.password.value)
      .then(x => this.SetProfile(x))
      .catch(x => this.onError(x));
  }
  public Register() {
    this.service.CreateUser(this.RegisterAuthForm.controls.name.value, this.RegisterAuthForm.controls.email.value, this.RegisterAuthForm.controls.password.value)
      .then(x => this.SetProfile(x))
      .catch(x => this.onError(x));
  }
  private SetProfile(x: any): any {
    this.store.dispatch([
      new SetUser(
        {
          uid: x.user.uid,
          name: x.user.displayName,
          email: x.user.email,
          picture: x.user.photoURL
        })
    ]);
    this.snackBar.open("Signed In " + this.app$.name, "OKAY", { duration: 3000 })
  }

  LoginGoogle() {
    this.service.SignInGoogle()
      .then(x => this.OAuthUser(x))
      .catch(x => this.onError(x));
  }

  // Mishmitewaka
  OAuthUser(user: any): any {
    this.snackBar.open("Signed In " + user.displayName, "OKAY", { duration: 3000 })
  }
  RegisterAuthForm = new FormGroup(
    {
      name: new FormControl,
      email: new FormControl,
      password: new FormControl,
      confirmPassword: new FormControl
    });
  LoginAuthForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  private onError(error) {
    alert(error);
  }
}
