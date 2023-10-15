import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieFilterComponent } from './movie/movie-filter/movie-filter.component'
import { NavMenuComponent } from './movie/nav-menu/nav-menu.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: NavMenuComponent },
  { path:'movies-list', component: MovieListComponent},
  { path:'movies-filter', component: MovieFilterComponent },
  { path:'movie/:id', component: MovieDetailComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


