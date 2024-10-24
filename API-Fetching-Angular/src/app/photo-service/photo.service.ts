import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private API_URL = 'https://picsum.photos/v2/list';
  private photosSubject = new BehaviorSubject<any[]>([]);
  private authorsSubject = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.fetchPhotos();
  }

  // Fetch data from the API
  private fetchPhotos() {
    this.http.get<any[]>(this.API_URL).subscribe(data => {
      this.photosSubject.next(data);
      const uniqueAuthors = [...new Set(data.map(photo => photo.author))];
      this.authorsSubject.next(uniqueAuthors);
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  // Get photos as an observable
  getPhotos(): Observable<any[]> {
    return this.photosSubject.asObservable();
  }

  // Get authors as an observable
  getAuthors(): Observable<string[]> {
    return this.authorsSubject.asObservable();
  }
}
