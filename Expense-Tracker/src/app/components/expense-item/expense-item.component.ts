import {Component, Input} from '@angular/core';
import {Expense} from '../../models/Expense';

@Component({
  selector: '[app-expense-item]',
  standalone: false,
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.scss'
})
export class ExpenseItemComponent {
  @Input() expense!: Expense;

  ngOnInit() {
    console.log('ExpenseItemComponent initialized');
    console.log(this.expense);
  }

}
