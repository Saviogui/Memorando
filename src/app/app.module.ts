import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FilterByTitlePipe } from './pipes/filter-by-title.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FilterByTitlePipe 
  ],
  providers: []
})
export class AppModule { }
