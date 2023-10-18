import { Component,OnInit } from '@angular/core';
import { MovieServiceService } from 'src/app/service/service.service';
import { Movie, MovieResult } from 'src/app/Interface/discover';
import { ComunicationMovieService } from 'src/app/service-comunication/comunication-movie.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  texto:string = '';
  searchResults:Movie[] = [];



  constructor(
  private moviesService: MovieServiceService,
  private movieComunicationsService: ComunicationMovieService
  ){}

  ngOnInit(): void {
    
  }

  onSearchMovie() {
    if(this.texto){
      this.moviesService.getSearchMovie(this.texto).subscribe((data:MovieResult) => {
        console.log(data);
        this.searchResults = data.results;

        this.movieComunicationsService.updateSearchResults(this.searchResults);
      });
    }
  }



}
