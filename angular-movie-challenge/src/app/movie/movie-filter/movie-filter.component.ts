import { Component, OnInit} from '@angular/core';
import { MovieServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent implements OnInit {

  genres:any[] = [];
  resultGenres:any[] = [];
  movies:any[] = [];
  selectGeners:number | undefined;
  currentPage:number = 1;
  totalPages:number = 1;

  constructor(private movieService: MovieServiceService) {}

  ngOnInit(): void {
    this.movieService.getGenersMovies().subscribe((data: any) => {
      console.log(data);
      this.genres = data.genres;
    });
  }

  // Mueve la función showMovieGenres aquí fuera de ngOnInit
  showMovieGenres(genreId: number) {
    this.movieService.getGenersMovies(genreId).subscribe((data: any) => {
      this.resultGenres = data.results;
    });
  }

  //pagination 


  //action

  onGenreSelect(): void {
    /*if (this.selectGeners){
      this.movieService.getGenerCategory(this.selectGeners).subscribe((data: any) => {
        console.log(data);
        this.movies = data.results.map((movie: any) => {
          movie.poster_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          return movie;
        });
      });
    }*/
    if (this.selectGeners!== undefined) {
      this.currentPage = 1; // Reiniciar la página actual
      this.loadMovies();
    }
  }

  loadMovies(): void {
    if(this.selectGeners !== undefined) {
      this.movieService.getGenerCategory(this.selectGeners,this.currentPage).subscribe((data: any) => {
        if(data.results && data.results.length > 0) {
          console.log(data);
          this.movies = data.results;
          this.totalPages = data.totalPages;
          this.currentPage ++;
          this.movies = data.results.map((movie: any) => {
            movie.poster_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            return movie;
          });

        }
      });
    }
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies();
    }
  }
  
  getPaginationArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
}






