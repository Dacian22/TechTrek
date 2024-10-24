import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-author-filter',
  standalone: false,
  templateUrl: './author-filter.component.html',
  styleUrl: './author-filter.component.css'
})
export class AuthorFilterComponent {
  @Input() authors: string[] = [];
  @Output() authorSelected = new EventEmitter<string>();

  onAuthorChange(event: any) {
    this.authorSelected.emit(event.target.value);
  }
}
