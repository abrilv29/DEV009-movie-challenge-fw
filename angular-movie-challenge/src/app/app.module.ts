import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieServiceService } from './service/service.service';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieFilterComponent } from './movie/movie-filter/movie-filter.component';
import { NavMenuComponent } from './movie/nav-menu/nav-menu.component';
import { SearchComponent } from './movie/search/search.component';
import { ComunicationMovieService } from './service-comunication/comunication-movie.service';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component'


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieFilterComponent,
    NavMenuComponent,
    SearchComponent,
    MovieDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [
    MovieServiceService,
    ComunicationMovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
