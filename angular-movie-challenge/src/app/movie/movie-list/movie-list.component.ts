import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any[] = []; //
  pageSize: number = 5;
  currentPage: number = 1;

    // Define la propiedad 'pages' en el componente
    pages: number[] = [];

  constructor(private moviesService: MovieServiceService){}

  ngOnInit(): void{
    
    // Llamamos al servicio para obtener los datos de las peliculas mediante discovery
    this.moviesService.getDiscoveryMovie().subscribe((data: any) => {
      // Almacenamos los datos en la propiedad movies
      console.log(data);
      this.movies = data.results;
    }); //
  }

  // Paginacion 

  getMoviePagination():any[]{
    const indexStart = (this.currentPage - 1) * this.pageSize;
    const indexEnd = indexStart + this.pageSize;
    return this.movies.slice(indexStart, indexEnd);
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
   if (this.movies.length === 0 || this.pageSize === 0) {
    return 0;
  }
  return Math.ceil(this.movies.length / this.pageSize);
}

  getMoviePosterUrl( posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500/';
    return baseUrl + posterPath;
  }


  

}
