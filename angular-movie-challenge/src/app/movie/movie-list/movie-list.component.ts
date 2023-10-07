import { Component, OnInit, numberAttribute } from '@angular/core';
import { MovieResult, Movie} from 'src/app/Interface/discover';

import { MovieServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  public movies: Movie[] = []; //
  public currentPage: number = 1;
  public totalPages: number = 0;
  
  constructor(private moviesService: MovieServiceService) { }

  ngOnInit(): void {
    this.getDiscoveryMovie(this.currentPage);
  }

  // CATALOGO DISCOVER - MOVIES

  private getDiscoveryMovie(page: number) {

    this.moviesService.getDiscoveryMovie(page).subscribe((data:MovieResult)=>{
      console.log(data);
      this.movies = data.results;
      this.currentPage = data.page;
      this.totalPages = data.total_results;

    });
  }

  // PAGINACION

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage ++;
      this.getDiscoveryMovie(this.currentPage);
    }
  }

  prevPage(){
    if(this.currentPage > 1){
      this.currentPage --;
      this.getDiscoveryMovie(this.currentPage);
    }
  }

  
}


