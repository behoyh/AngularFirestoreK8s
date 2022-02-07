import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from './post-dialog-data';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public ngOnInit() {
    this.data.date = new Date().toISOString(); 
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public uploadFile(){
    
  }
}
