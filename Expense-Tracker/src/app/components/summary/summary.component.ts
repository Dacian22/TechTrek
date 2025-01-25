import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../../services/expense.service';
import {DayMapping} from '../../models/DayMapping.enum';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  weeklyExpenses: { [key: string]: any[] } = {};
  weeklyTotal: number = 0;

  dayMapping = DayMapping;

  get dayMappingKeys(): { key: string; value: string }[] {
    return Object.entries(this.dayMapping).map(([key, value]) => ({key, value}));
  }

  pieChartData: any;

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.expenses$.subscribe(data => {
      this.weeklyExpenses = data;
      console.log(this.weeklyExpenses)
      console.log(this.weeklyExpenses[this.dayMappingKeys[0].value])
      this.calculateWeeklyTotal();
      this.calculatePieChartData();
    });

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
