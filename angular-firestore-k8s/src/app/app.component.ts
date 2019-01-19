import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Store, Select } from '@ngxs/store';
import { AppState } from './shared/app.state';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular-firestore-k8s';

  @Select(AppState) user$;
  @Select() router$;

  constructor(private store: Store, public router: Router) {
  }

  public Home() {
    this.store.dispatch([
      new Navigate(['/'])
    ]);
  }

  public Profile() {
    this.store.dispatch([
      new Navigate(['/profile'])
    ]);
  }
  public Authentication() {
    this.store.dispatch(
      [new Navigate(['/auth'])]
    );
  }

  private onError(error) {
    alert(error);
  }
}
