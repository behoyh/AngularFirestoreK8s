import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 

  constructor(private db: AngularFirestore) { }

  GetPost(id:string) {
    return this.db.collection("posts").doc(id);
  }

  public GetPosts()
  {
    return this.db.collection("posts");
  }

  public CreatePost(post:any)
  {
    var id = this.db.createId();
    var data = 
    {
      id:id,
      name: post.name,
      body: post.body,
      date: post.date
    };

    return this.db.collection("posts").doc(id).set({
      ...data
    });
  }

  public EditPost(post:any)
  {
    var postsRef = this.db.collection("posts");
    var ref = postsRef.doc(post.id);

    return ref.set({
      body: post.body,
      name: post.name,
      date: post.date
    },{merge: true});
  }

  public DeletePost(id:string)
  {
    var postsRef = this.db.collection("posts");
    var ref = postsRef.doc(id);

    return ref.delete();
  }
}
