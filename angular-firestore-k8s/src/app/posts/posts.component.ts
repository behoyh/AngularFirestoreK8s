import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PostDialogComponent } from '../forms/post-dialog/post-dialog.component';
import { Select } from '@ngxs/store';
import { AppState } from '../shared/app.state';
import { get } from 'https';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  admin = false;

  items: Observable<any[]>;

  @Select(AppState) user$;

  constructor(public db: AngularFirestore, public router: Router, public dialog: MatDialog, public snackBar: MatSnackBar)
  {
    var postsRef = db.collection("posts");
    this.items = postsRef.valueChanges();

    debugger;
    this.user$.subscribe((user) =>
    {
      debugger;
      db.collection('users').doc(user.uid).get().subscribe((doc) => {
        debugger;
        this.admin = doc.data().admin
      });
    });
  }

  ngOnInit() {

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

    var postsRef = this.db.collection("posts");
    postsRef.doc(id).set({
      ...data
    })
    .then(x=> this.snackBar.open("Success!","OKAY", {duration:3000}))
    .catch(x=>this.onError(x));
  }

  public EditPost(post:any)
  {
    var postsRef = this.db.collection("posts");
    var ref = postsRef.doc(post.id);

    ref.set({
      body: post.body,
      name: post.name,
      date: post.date
    },{merge: true})
    .then(x=>this.snackBar.open("Updated Post","OKAY",{duration:2000}))
    .catch(x=>this.onError(x));
  }

  public DeletePost(id:string)
  {
    var postsRef = this.db.collection("posts");
    var ref = postsRef.doc(id);

    ref.delete()
    .then(x=>this.snackBar.open("Deleted Post","OKAY",{duration:2000}))
    .catch(x=>this.onError(x));
  }

  public PostDialog(item:any={})
  {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '100%',
      height:'100%',
      data: {
        id: item.id,
        body: item.body,
        name: item.name,
        date: item.date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Post(result);
    });
  }
  Post(result: any): any {
    if (result.id)
    {
      this.EditPost(result);
    }
    else{
      this.CreatePost(result);
    }
  }

  private onError(error)
  {
    alert(error);
  }
}
