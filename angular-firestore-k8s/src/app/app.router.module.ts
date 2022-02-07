import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PostComponent } from './post/post.component';
import { PostResolverService } from './post/post-resolver.service';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostsComponent },
  {
    path: 'posts/:id', component: PostComponent,
    resolve: {
      post: PostResolverService
    }
  },
  { path: 'auth', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRouterModule {

}