import { Component, OnInit, SecurityContext } from '@angular/core';
import { PostService } from '../posts/post.service';
import { Store, Select } from '@ngxs/store';
import { AppState } from '../shared/app.state';
import { RouterNavigation } from '@ngxs/router-plugin';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any;

  @Select(AppState) user$;

  constructor(private store: Store, private service: PostService, private router: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.router.params.subscribe(post =>
      {
        this.LoadPost(post.id);
      });
        
  }

  LoadPost(post: string): any {
    this.service.GetPost(post).then((post) => {
      this.post = post.data();
      this.post.body = this.sanitizer.bypassSecurityTrustHtml(this.post.body)
    });
  }

}
