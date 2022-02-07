import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: Firestore)
  {
  }

  public async GetPosts()
  {
    var postsRef = collection(this.db, "posts");
    return postsRef;
  }
}
