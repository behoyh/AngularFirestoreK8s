import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) {

  }

  public UploadImages(file: any, format: string, uid: any): Observable<number> {
    var filePath = '/user/' + uid + '/images/' + Date.UTC + format;
    var ref = this.storage.ref(filePath);
    return ref.put(file).percentageChanges();
  }

  public UploadVideos(file: any, format: string, uid: any): Observable<number> {
    var filePath = '/user/' + uid + '/videos/' + Date.UTC + format;
    var ref = this.storage.ref(filePath);
    return ref.put(file).percentageChanges();
  }

  public UploadContent(file: any, format: string, uid: any): Observable<number> {
    var filePath = '/user/' + uid + '/content/' + Date.UTC + format;
    var ref = this.storage.ref(filePath);
    return ref.put(file).percentageChanges();
  }
}
