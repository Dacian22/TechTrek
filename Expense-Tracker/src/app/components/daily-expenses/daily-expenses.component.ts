import { Component, Input } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/Category';
import {ExpenseService} from '../../services/expense.service';
import {Expense} from '../../models/Expense';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-daily-expenses',
  standalone: false,
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.scss'],
  providers: [MessageService]
})
export class DailyExpensesComponent {
  @Input() day!: string;

  expensesForm: FormGroup;
  editingIndex = -1;
  categories: Category[] = [{name:"Food", value:"Food"}, {name:"Transport", value:"Transport"}, {name:"Entertainment", value:"Entertainment"}, {name:"Health", value:"Health"}, {name:"Miscellaneous", value:"Miscellaneous"}];

  constructor(private fb: FormBuilder, private expenseService: ExpenseService,private messageService: MessageService) {
    this.expensesForm = this.fb.group({
      expenses: this.fb.array([]),
      newName: ['', [Validators.required]], // Name as the unique identifier
      newCategory: ['', Validators.required], // Category should be required
      newAmount: ['',[Validators.required, Validators.min(0)]], // Amount should be required
    });
  }

  get expenses(): FormArray {
    return this.expensesForm.get('expenses') as FormArray;
  }

  get dailyTotal(): number {
    return this.expenses.controls.reduce(
      (total, control) => total + +control.get('amount')?.value || 0,
      0
    );
  }

  private isNameUnique(name: string): boolean {
    const existingNames = this.expenses.controls.map(expense => expense.get('name')?.value);
    return !existingNames.includes(name);
  }
  addExpense() {
    if (this.expensesForm.valid) {
      const newName = this.expensesForm.get('newName')?.value;
      const newCategory = this.expensesForm.get('newCategory')?.value;
      const newAmount = this.expensesForm.get('newAmount')?.value;

      // Check if the new name is unique only when adding an expense
      if (!this.isNameUnique(newName)) {
        console.error('Expense name must be unique');
        this.messageService.add({ severity: 'error', summary: 'Duplicate Name', detail: 'The expense name must be unique.', life: 3000 });
        return; // Exit the method if the name is not unique
      }


      this.expenses.push(
        this.fb.group({
          name: newName,
          category: newCategory,
          amount: newAmount,
        })
      );
      this.expensesForm.patchValue({newName:"", newCategory: '', newAmount: ''});
      const newExpense: Expense = {
        name: newName,
        category: newCategory,
        amount: newAmount
      };

      // Directly call the service method to add or edit the expense
      this.expenseService.addOrEditExpense(this.day, newExpense);

      // Reset form fields after adding an expense
      this.expensesForm.patchValue({
        newCategory: '',
        newAmount: 0
      });

      this.expensesForm.get('newName')?.markAsUntouched();
      this.expensesForm.get('newCategory')?.markAsUntouched();
      this.expensesForm.get('newCategory')?.markAsPristine();
      this.expensesForm.get('newAmount')?.markAsUntouched();
    }
  }

  editExpense(index: number): void {
    const expense = this.expenses.at(index);
    this.expensesForm.patchValue({
      newName: expense.get('name')?.value,
      newCategory: expense.get('category')?.value,
      newAmount: expense.get('amount')?.value
    });

    this.expenses.removeAt(index);
  }

  deleteExpense(index: number) {
    this.expenses.removeAt(index);
  }
}
