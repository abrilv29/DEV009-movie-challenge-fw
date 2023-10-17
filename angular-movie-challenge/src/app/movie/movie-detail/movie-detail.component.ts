import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from 'src/app/service/service.service';
import { DetailsResult } from 'src/app/Interface/details';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie: DetailsResult | undefined;
  detailsGenres: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieServiceService,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.movieService.getMovieDetails(movieId).subscribe((data: DetailsResult) => {
        console.log(data);
        this.movie = data;
         this.detailsGenres = this.movie.genres.map((genre) => genre.name).join(', ');
      });
    });
  }

}
