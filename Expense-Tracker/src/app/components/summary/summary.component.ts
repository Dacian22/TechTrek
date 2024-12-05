import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../../services/expense.service';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  weeklyExpenses: { [key: string]: any[] } = {};
  weeklyTotal: number = 0;
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dayMapping: { name: string, fullName: string }[] = [
    { name: 'Mon', fullName: 'Monday' },
    { name: 'Tue', fullName: 'Tuesday' },
    { name: 'Wed', fullName: 'Wednesday' },
    { name: 'Thu', fullName: 'Thursday' },
    { name: 'Fri', fullName: 'Friday' },
    { name: 'Sat', fullName: 'Saturday' },
    { name: 'Sun', fullName: 'Sunday' }
  ];

  pieChartData: any;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.expenses$.subscribe(data => {
      this.weeklyExpenses = data;
      this.calculateWeeklyTotal();
      this.calculatePieChartData();
    });
    console.log(this.weeklyExpenses);
  }

  calculatePieChartData() {
    const categoryTotals: { [key: string]: number } = {};
    for (const day in this.weeklyExpenses) {
      for (const expense of this.weeklyExpenses[day]) {
        const categoryName = expense.category.name;
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + expense.amount;
      }
    }

    // Preparing chart data format for p-chart
    this.pieChartData = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }
      ]
    };
    console.log("pie chart",this.pieChartData);
  }

  calculateWeeklyTotal(): void {
    this.weeklyTotal = Object.values(this.weeklyExpenses).flat().reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
  }


  exportToExcel() {
    this.expenseService.exportToExcel();
  }
}
