import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}