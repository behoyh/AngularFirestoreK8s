import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: Storage) {

  }

  public UploadImages(file: any, format: string, uid: any): any {
    //var filePath = '/user/' + uid + '/images/' + Date.UTC + format;
    //var ref = this.storage.ref(filePath);
    //return ref.put(file).percentageChanges();
  }

  public UploadVideos(file: any, format: string, uid: any): any {
    //var filePath = '/user/' + uid + '/videos/' + Date.UTC + format;
    //var ref = this.storage.ref(filePath);
    //return ref.put(file).percentageChanges();
  }

  public UploadContent(file: any, format: string, uid: any): any {
    //var filePath = '/user/' + uid + '/content/' + Date.UTC + format;
    //var ref = this.storage.ref(filePath);
    //return ref.put(file).percentageChanges();
  }
}
