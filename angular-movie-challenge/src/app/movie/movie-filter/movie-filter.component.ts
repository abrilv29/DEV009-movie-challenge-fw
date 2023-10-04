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
  currentGenerPage:number = 1;
  totalGenerPage:number = 1;
  pageSize: number = 1;
  totalPages: number = 1;


  // Define la propiedad 'pages' en el componente
    pages: number[] = [];


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
    if (this.selectGeners){
      this.currentGenerPage = 1;
      this.movieService.getGenerCategory(this.selectGeners, this.currentGenerPage).subscribe((data: any) => {
        console.log(data);
        console.log(`Total Pages: ${data.total_pages}`);
        console.log(this.currentGenerPage);
        this.movies = data.results.map((movie: any) => {
          movie.poster_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          return movie;
        });
        this.totalGenerPage = data.total_pages;
        console.log(this.totalGenerPage)
      });
    }

  }

    // Paginacion 

    getGenerPagination():any[]{
      return this.movies/* .slice(indexStart, indexEnd) */;
    }
  
    nextGenerPage() {
      console.log('Next page clicked');
      console.log(`Current Page: ${this.currentGenerPage}`);
      console.log(`Total Pages: ${this.totalGenerPage}`);
      if (this.currentGenerPage < this.totalGenerPage) {
        this.setGenerPage(this.currentGenerPage + 1);
      }
    }
    
    prevGenerPage() {
      console.log('Prev page clicked');
      console.log(`Current Page: ${this.currentGenerPage}`);
      console.log(`Total Pages: ${this.totalGenerPage}`);
      if (this.currentGenerPage > 1) {
        this.setGenerPage(this.currentGenerPage - 1);
      }
    }
    
    
    private setGenerPage(page: number) {
      if (page >= 1 && page <= this.totalGenerPage) {
        this.currentGenerPage = page;
        this.onGenreSelect();
      }
    }
  
    get totalGenerMoviePages(): number {
      if (this.movies.length === 0 || this.pageSize === 0) {
       return 0;
     }
     return Math.ceil(this.movies.length / this.pageSize);
   }
  
  
}