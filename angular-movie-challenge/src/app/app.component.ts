import { Component } from '@angular/core';
import { MovieServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tredingImg: string[] = [];

  constructor(private moviesService: MovieServiceService){}

  /*ngOnInit(): void{

    this.moviesService.getsliderTrending().subscribe((data:any) =>{
      console.log(data);
      this.tredingImg = data.results.map((movie: any) => {
        return`https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      });
    });
  }*/

}
