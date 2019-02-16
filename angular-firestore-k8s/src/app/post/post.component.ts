import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';
import { Store, Select } from '@ngxs/store';
import { AppState } from '../shared/app.state';
import { RouterNavigation } from '@ngxs/router-plugin';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any;

  @Select(AppState) user$;

  constructor(private store: Store, private service: PostService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(post =>
      {
        this.LoadPost(post.id);
      });
        
  }

  LoadPost(post: string): any {
    this.service.GetPost(post).get().subscribe((post) => {
      this.post = post.data();
    });
  }

}
