import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import ExcelJS from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expensesSubject = new BehaviorSubject<{ [key: string]: any[] }>({});
  expenses$ = this.expensesSubject.asObservable();

  constructor() {
  }

  // Add or edit an expense for a specific day
  addOrEditExpense(day: string, expense: any): void {
    const currentExpenses = this.expensesSubject.value;
    if (!currentExpenses[day]) {
      currentExpenses[day] = [];
    }

    // Check if expense exists and update or add it
    const index = currentExpenses[day].findIndex(e => e.name === expense.name);
    if (index !== -1) {
      // Edit the existing expense
      currentExpenses[day][index] = expense;
    } else {
      // Add new expense
      currentExpenses[day].push(expense);
    }
    // Emit the updated expenses
    this.expensesSubject.next({...currentExpenses});

  }

  // Get all expenses for a specific day
  getExpensesForDay(day: string): any[] {
    return this.expensesSubject.value[day] || [];
  }

  exportToExcel(): void {
    const allExpenses = this.expensesSubject.value; // Get the current value from BehaviorSubject

    // Flatten all expenses grouped by days into a single array
    const flattenedExpenses = Object.entries(allExpenses).flatMap(([day, expenses]) =>
      expenses.map(expense => ({
        day, // Include the day in the export
        name: expense.name,
        category: expense.category.name,
        amount: expense.amount
      }))
    );

    // Create an Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Weekly Expenses');

    // Define columns
    worksheet.columns = [
      {header: 'Day', key: 'day', width: 15},
      {header: 'Name', key: 'name', width: 20},
      {header: 'Category', key: 'category', width: 20},
      {header: 'Amount', key: 'amount', width: 15}
    ];

    // Add rows to the worksheet
    flattenedExpenses.forEach(expense => worksheet.addRow(expense));

    // Generate the Excel file and save it
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {type: 'application/octet-stream'});
      fs.saveAs(blob, 'Weekly_Expenses.xlsx');
    });
  }

}
