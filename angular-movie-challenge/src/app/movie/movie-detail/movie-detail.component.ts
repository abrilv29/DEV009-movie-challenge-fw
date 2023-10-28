import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from 'src/app/service/service.service';
import { DetailsResult } from 'src/app/Interface/details';
import { Subscription } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Video } from 'src/app/Interface/video';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movieId: number = 0;
  movie: DetailsResult | undefined;
  detailsGenres: string = '';
  videoUrl: SafeResourceUrl | undefined;
  showVideo: boolean = false;
  isModalOpen = false;

  subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieServiceService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.movieService.getMovieDetails(this.movieId).subscribe((data: DetailsResult) => {
        console.log(data);
        this.movie = data;
        this.detailsGenres = this.movie.genres.map((genre) => genre.name).join(', ');
      });

      // Obtén la URL del video
      this.movieService.getMovieVideos(this.movieId).subscribe({
        next: (videosData: Video) => {
          if (videosData.results) {
            const trailer = videosData.results.find((video) => video.type === 'Trailer');
            if (trailer) {
              // Marca la URL como segura
              this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
              this.showVideo = true; // Muestra el video
            }
          }
        },
      });

    });// 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBackdropUrl() {
    if (this.movie) {
      return 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
    }
    return '';
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
