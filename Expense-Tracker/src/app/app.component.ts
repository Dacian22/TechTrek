import {Component} from '@angular/core';

import {MessageService} from 'primeng/api';
import {DayMapping} from './models/DayMapping.enum';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  title = 'Expense-Tracker';
  dayMapping = Object.entries(DayMapping);

  constructor(private messageService: MessageService) {
  }

  // Track the active tab index
  activeIndex = 0;

  // Total number of tabs (daily tabs + summary tab)
  totalTabs = this.dayMapping.length + 1; // +1 for the "Summary" tab

  // Navigate to the next tab
  nextTab() {
    if (this.activeIndex < this.totalTabs - 1) {
      this.activeIndex++;
    }
  }

  // Navigate to the previous tab
  prevTab() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

}
