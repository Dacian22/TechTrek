import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { DailyExpensesComponent } from './components/daily-expenses/daily-expenses.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { ExpenseItemCardComponent } from './components/expense-item-card/expense-item-card.component';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    DailyExpensesComponent,
    SummaryComponent,
    ExpenseItemCardComponent,
    ExpenseItemComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    TabViewModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    BrowserAnimationsModule,
    ChartModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
