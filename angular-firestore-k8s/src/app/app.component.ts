import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Initalize } from './app.initalize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firestore-k8s';
  items: Observable<any[]>;
  constructor(db: AngularFirestore)
  {
    var postsRef = db.collection("posts");

    this.items = postsRef.valueChanges();

    Initalize.Init(postsRef);
  }
}
