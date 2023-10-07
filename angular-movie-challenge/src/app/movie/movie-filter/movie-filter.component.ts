import { Component, OnInit} from '@angular/core';
import { MovieServiceService } from 'src/app/service/service.service';

import { Movie } from 'src/app/Interface/discover';


@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent implements OnInit {

  genres: number[] = [];
  resultGenres: Movie[] = [];
  movies:Movie[] = [];
  selectGeners: number | undefined;

  constructor(private movieService: MovieServiceService) {}

  ngOnInit(): void {
    // Obtener la lista de géneros
    this.movieService.getGenersMovies().subscribe((data: Movie[]) => {
      console.log(data);
      this.genres = data.map((movie: Movie) => movie.genre_ids).flat();
    });
  }
}

/*  // Mueve la función showMovieGenres aquí fuera de ngOnInit
  showMovieGenres(genre_ids: number) {
    if (genre_ids) {
      this.movieService.getGenersMovies(genre_ids).subscribe((data: Movie) => {
        console.log(data);
        this.resultGenres = data.genre_ids;
      });
    }
  }
  */


/*onGenreSelect(): void {
    if (this.selectGeners){
        this.movieService.getGenerCategory(this.selectGeners).subscribe((data: any) => {
        console.log(data);
        this.movies = data.results.map((movie: any) => {
          movie.poster_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          return movie;
        });
      });
    }

  }*/

  

  
  
