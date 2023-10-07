import { Component, OnInit } from '@angular/core';
import { MovieResult, Movie} from 'src/app/Interface/discover';

import { MovieServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  public movies: Movie[] = []; //

  constructor(private moviesService: MovieServiceService) { }

  ngOnInit(): void {
    this.getDiscoveryMovie();
  }

  // CATALOGO DISCOVER - MOVIES

  private getDiscoveryMovie() {

    this.moviesService.getDiscoveryMovie().subscribe((data:Movie[])=>{
      console.log(data);
      this.movies = data;
    });
  }

  // PAGINACION

  
}


