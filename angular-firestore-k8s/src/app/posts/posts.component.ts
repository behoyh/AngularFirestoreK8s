import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PostDialogComponent } from '../forms/post-dialog/post-dialog.component';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../shared/app.state';
import { PostService } from './post.service';
import { ProfileService } from '../profile/profile.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  admin = false;

  items: Observable<any[]>;

  @Select(AppState) user$;

  constructor(private store: Store, private postService: PostService, userService: ProfileService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.items = postService.GetPosts().valueChanges();

    this.user$.subscribe((user) => {
      userService.GetUser(user.uid).get().subscribe((doc) => {
        this.admin = doc.data().admin
      });
    });
  }

  ngOnInit() {

  }

  public GetPost(id: string) {
    this.store.dispatch(
      new Navigate(["/posts/" + id])
    );
  }

  public CreatePost(post: any) {
    this.postService.CreatePost(post)
      .then(x => this.snackBar.open("Success!", "OKAY", { duration: 3000 }))
      .catch(x => this.onError(x));
  }

  public EditPost(post: any) {
    this.postService.EditPost(post)
      .then(x => this.snackBar.open("Updated Post", "OKAY", { duration: 2000 }))
      .catch(x => this.onError(x));
  }

  public DeletePost(id: string) {
    this.postService.DeletePost(id)
      .then(x => this.snackBar.open("Deleted Post", "OKAY", { duration: 2000 }))
      .catch(x => this.onError(x));
  }

  public PostDialog(item: any = {}) {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '100%',
      height: '100%',
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
    if (result.id) {
      this.EditPost(result);
    }
    else {
      this.CreatePost(result);
    }
  }

  private onError(error) {
    alert(error);
  }
}
