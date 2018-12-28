import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PostDialogComponent } from './forms/post-dialog/post-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'angular-firestore-k8s';
  items: Observable<any[]>;

  constructor(public db: AngularFirestore, public dialog: MatDialog, public snackBar: MatSnackBar)
  {
    var postsRef = db.collection("posts");
    this.items = postsRef.valueChanges();
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
      width: '300px',
      data: {
        id: item.id,
        body: item.body,
        name: item.name,
        date: item.date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      debugger;
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
