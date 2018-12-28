import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular-firestore-k8s';

  constructor(public router: Router)
  {
  }

  public Profile()
  {
    this.router.navigate(["/profile"]);
  }

  private onError(error)
  {
    alert(error);
  }
}
