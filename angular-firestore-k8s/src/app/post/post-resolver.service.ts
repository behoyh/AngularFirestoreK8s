import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Store } from '@ngxs/store';
import { PostService } from '../posts/post.service';
import { mergeMap, take } from 'rxjs/operators';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService implements Resolve<string> {

  constructor(private postService: PostService, private store:Store) { }

  public resolve(route: ActivatedRouteSnapshot): any {
    let id = route.paramMap.get('id');

    this.postService.GetPost(id).get().pipe(
      take(1),
      mergeMap(post => {
        if (post) {
          this.store.dispatch(new Navigate(['/posts/'+id]));
          return of(post);
        } else { // id not found
          this.store.dispatch(new Navigate(['/posts']));
          return EMPTY;
        }
      }));
  }
}
