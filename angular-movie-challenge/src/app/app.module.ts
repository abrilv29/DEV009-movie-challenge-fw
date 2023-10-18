import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieServiceService } from './service/service.service';
import { ComunicationMovieService } from './service-comunication/comunication-movie.service';
import { MovieRoutingModule } from './movie/movie-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MovieRoutingModule
  ],
  
  providers: [
    MovieServiceService,
    ComunicationMovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
