import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from 'src/app/service/service.service';
import { DetailsResult } from 'src/app/Interface/details';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
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
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idString = params['id']; // Obtiene el valor del parámetro como cadena
      this.movieId = parseInt(idString, 10); // Convierte la cadena a número
      if (!isNaN(this.movieId)) {
        // El valor es un número válido, puedes continuar con la solicitud HTTP
        this.getMovieDetails(this.movieId);
      } else {
        // Maneja el caso en el que el valor del parámetro no es un número válido
        console.error('Invalid movie ID:', idString);
      }
    });
  }

  getMovieDetails(movieId: number) {
    this.movieService.getMovieDetails(movieId).subscribe(
      (data: any) => {
        console.log(data);
        this.movie = data;
        if (this.movie !== undefined) {
          this.detailsGenres = this.movie.genres.map((genre) => genre.name).join(', ');
        } else {
          // Maneja el caso en el que this.movie es undefined
          console.error('Movie is undefined.');
        }
        

        // Obtén la URL del video
        this.movieService.getMovieVideos(movieId).subscribe((videosData: any) => {
          if (videosData && videosData.results) {
            const trailer = videosData.results.find((video: { type: string }) => video.type === 'Trailer');
            if (trailer) {
              // Marca la URL como segura
              this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
              this.showVideo = true; // Muestra el video
            }
          }
        });
      },
      (error: any) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
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
