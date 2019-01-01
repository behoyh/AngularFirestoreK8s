import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatGridListModule, MatToolbarModule, MatCardModule, MatIconModule, MatTabsModule, MatRippleModule, MatStepperModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { PostDialogComponent } from './forms/post-dialog/post-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { AppRouterModule } from './app.router.module';
import { APP_BASE_HREF, NgTemplateOutlet } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    PostDialogComponent,
    ProfileComponent,
    PostsComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'blog-client'),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    AppRouterModule,
    RouterModule,
    MatTabsModule,
    MatRippleModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  entryComponents: [PostDialogComponent],
  exports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSnackBarModule,MatDialogModule,MatGridListModule,MatToolbarModule,MatCardModule,MatIconModule,MatTabsModule,MatRippleModule,MatStepperModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
