import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/app/service/movie-service.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  movies: any[] = []; //

  constructor(private moviesService: MovieServiceService){}

  ngOnInit(): void{
    
    // Llamamos al servicio para obtener los datos de las peliculas mediante discovery
    this.moviesService.getDiscoveryMovie().subscribe((data: any) => {
      // Almacenamos los datos en la propiedad movies
      console.log(data);
      this.movies = data.results;
    }); //
  }

  

}
