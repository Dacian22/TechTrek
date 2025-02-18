import {Component, Input, OnChanges} from '@angular/core';
import { Photo } from '../model/Photo';

@Component({
  selector: 'app-card-list',
  standalone: false,
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent implements OnChanges {
  @Input() photos: Photo[] = [];
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  paginatedPhotos: Photo[] = [];

  ngOnChanges() {
    this.updatePaginatedPhotos();
  }

  updatePaginatedPhotos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.paginatedPhotos = this.photos.slice(startIndex, endIndex);
  }
}
