import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AuthorFilterComponent} from './author-filter/author-filter.component';
import {CardListComponent} from './card-list/card-list.component';
import {PaginationComponent} from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorFilterComponent,
    CardListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
