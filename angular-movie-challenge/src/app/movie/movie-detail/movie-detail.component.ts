import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from 'src/app/service/service.service';
import { DetailsResult } from 'src/app/Interface/details';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movieId: number = 0;
  movie: DetailsResult | undefined;
  detailsGenres: string = '';

  subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieServiceService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.movieService.getMovieDetails(this.movieId).subscribe((data: DetailsResult) => {
        console.log(data);
        this.movie = data;
        this.detailsGenres = this.movie.genres.map((genre) => genre.name).join(', ');
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Método para obtener la URL completa del backdrop_path
  getBackdropUrl() {
    if (this.movie) {
      return 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
    }
    return ''; // O maneja un valor por defecto si movie no está definido
  }
}

