import { Component } from '@angular/core';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  title = 'Expense-Tracker';
  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  constructor(private messageService: MessageService) {}

}
