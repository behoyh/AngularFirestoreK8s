import { Component, OnInit } from '@angular/core';
import { ProfileService  } from '../profile/profile.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  public email: string;
  public password: string;

public user:any;

  constructor(public service:ProfileService) { }

  ngOnInit() {

  }

  public Login() {
    this.service.Login(this.email, this.password).forEach(x=>this.user=x);
  }
}
