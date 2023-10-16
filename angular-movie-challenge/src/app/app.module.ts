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
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';



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
    FormsModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule

  ],
  providers: [
    MovieServiceService,
    ComunicationMovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
