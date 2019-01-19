import { Component, OnInit } from '@angular/core';
import { ProfileService  } from '../profile/profile.service';
import { Store, Select } from '@ngxs/store';
import { SetUser } from '../shared/app.actions';
import { MatSnackBar } from '@angular/material';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  @Select() app$;
  @Select() router$;

  public email: string;
  public password: string;

public user:any;

constructor(private store: Store,private service:ProfileService, private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  public Login() {
   this.service.Login(this.email, this.password).then(x=>this.SetProfile(x));
  }
  private SetProfile(x: any): any {
    this.store.dispatch([
      new SetUser(
        {
          uid: x.additionalUserInfo.profile.uid,
          name: x.additionalUserInfo.name,
          email: x.additionalUserInfo.profile.email,
          picture: x.additionalUserInfo.profile.picture
        }),
        new Navigate(['/'])
      ]);

      this.snackBar.open("Signed In " + this.app$.name,"OKAY", {duration:3000})
  }

  LoginGoogle() {
    this.service.SignInGoogle()
      .then(x => this.OAuthUser(x));
  }

  //Mishmitewaka
  OAuthUser(user: any): any {
    this.user = user;

    this.store.dispatch([
      new SetUser(
        {
          uid: user.user.uid,
          name: user.additionalUserInfo.name,
          email: user.additionalUserInfo.profile.email,
          picture: user.additionalUserInfo.profile.picture
        }),
      new Navigate(['/'])
    ]);

    this.snackBar.open("Added User.", "OKAY", { duration: 3000 })
  }
}
