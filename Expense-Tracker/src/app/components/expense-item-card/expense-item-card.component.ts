import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Expense} from '../../models/Expense';

@Component({
  selector: 'app-expense-item-card',
  templateUrl: './expense-item-card.component.html',
  styleUrls: ['./expense-item-card.component.scss']
})
export class ExpenseItemCardComponent {
  @Input() expense!: Expense; // The expense data to display
  @Input() index!: number; // The index of the expense

  @Output() edit = new EventEmitter<number>(); // Emits when the edit button is clicked
  @Output() delete = new EventEmitter<number>(); // Emits when the delete button is clicked

  onEdit(): void {
    this.edit.emit(this.index);
  }

  onDelete(): void {
    this.delete.emit(this.index);
  }
}
