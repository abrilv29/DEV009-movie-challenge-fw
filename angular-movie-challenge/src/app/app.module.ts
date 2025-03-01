import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MovieRoutingModule } from './movie/movie-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 
    FormsModule,
    BrowserAnimationsModule,
    MovieRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
