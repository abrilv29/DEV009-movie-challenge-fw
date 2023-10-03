import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieFilterComponent } from './movie/movie-filter/movie-filter.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path:'movies', component: MovieFilterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
