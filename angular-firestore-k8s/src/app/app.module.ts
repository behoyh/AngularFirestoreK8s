import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatGridListModule, MatToolbarModule, MatCardModule} from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { PostDialogComponent } from './forms/post-dialog/post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PostDialogComponent
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
    MatCardModule
  ],
  entryComponents: [PostDialogComponent],
  exports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSnackBarModule,MatDialogModule,MatGridListModule,MatToolbarModule,MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
