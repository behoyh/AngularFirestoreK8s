import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth} from 'firebase';
import { ProfileService } from './profile.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:auth.UserCredential = {credential:null,user:null};
  profilePicture:string;
  constructor(public profileService: ProfileService, public snackBar: MatSnackBar) {
  }
  login() {
    this.profileService.SignIn()
      .then(x=>this.setUser(x));
  }

  setUser(user: any): any {
    this.user = user;
    this.profilePicture = user.additionalUserInfo.profile.picture
  }
  logout() {
    this.profileService.SignOut();
    this.user = null;
  }

  public StepChanged(event:any)
  {
    let user = this.user;

    if (user && user.user.uid && event.selectedIndex == 2)
    {
      this.profileService.CreateUser(user.additionalUserInfo,this.GoogleAuthForm.controls.confirmPassword.value)
      .then(x=> this.snackBar.open("Added User!","OKAY", {duration:3000}))
      .catch(x=>this.onError(x))
    }


    debugger;
  }

  GoogleAuthForm = new FormGroup(
    {
      username: new FormControl,
      password: new FormControl,
      confirmPassword: new FormControl
    });

  ngOnInit() {
  }

  private onError(error)
  {
    alert(error);
  }

}
