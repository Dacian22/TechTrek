import {Component, OnInit} from '@angular/core';
import {PhotoService} from './photo-service/photo.service';
import { Photo } from './model/Photo';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  authors: string[] = [];
  itemsPerPage = 10;
  currentPage = 1;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
      this.filteredPhotos = data;
    });

    this.photoService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  onAuthorSelected(author: string) {
    this.filteredPhotos = author ? this.photos.filter(photo => photo.author === author) : this.photos;
    this.currentPage = 1;
  }

  onPageChanged(page: number) {
    this.currentPage = page;
  }
}
