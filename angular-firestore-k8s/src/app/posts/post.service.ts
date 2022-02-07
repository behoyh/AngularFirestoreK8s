import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, doc, deleteDoc, collectionData, getDoc, DocumentData, DocumentSnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 

  constructor(private db: Firestore) { }

  public GetPost(id:string) : Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(collection(this.db, "posts"), id));
  }

  public GetPosts() : Observable<any[]>
  {
    return collectionData(collection(this.db, "posts"));
  }

  public CreatePost(post:any)
  {
    const newPost = doc(collection(this.db, "posts"));

    var data = {
      id: newPost.id,
      name: post.name,
      body: post.body,
      date: post.date
    };

    return setDoc(newPost, data);
  }

  public EditPost(post:any)
  {
     var data = {
      body: post.body,
      name: post.name,
      date: post.date
    };

    return updateDoc(doc(this.db, "posts", post.id), data);
  }

  public DeletePost(id:string)
  {
    return deleteDoc(doc(this.db, "posts", id));
  }
}
