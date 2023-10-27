import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MovieServiceService } from 'src/app/service/service.service';
import { MovieDetailComponent } from './movie-detail.component';
import { DetailsResult } from 'src/app/Interface/details';
import { Site, Video } from 'src/app/Interface/video';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieService: jasmine.SpyObj<MovieServiceService>;

  const mockMovieDetails: DetailsResult = {
    id: 1,
    title: 'Título de la película',
    backdrop_path: '/ruta/imagen.jpg',
    overview: 'Descripción de la película',
    genres: [
      { id: 1, name: 'Acción' },
      { id: 2, name: 'Aventura' },
    ],
    poster_path: '/ruta/imagen.jpg',
    original_title: '',
    vote_average: 0,
    vote_count: 0,
    release_date: new Date(),
  };

  const mockMovieVideos: Video = {
    id: 123, // ID simulado
    results: [
      {
        type: 'Trailer', 
        name: 'Trailer Name',
        key: 'video-key',
        site: Site.YouTube, 
        size: 720, 
        id: 'video-id',
      },
    ],
  }

  beforeEach(() => {
    movieService = jasmine.createSpyObj('MovieServiceService', [
      'getMovieDetails',
      'getMovieVideos',
    ]);

    TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: MovieServiceService, useValue: movieService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //ngOnInit

  it('should load movie details and videos', () => {
    movieService.getMovieDetails.and.returnValue(of(mockMovieDetails));
    movieService.getMovieVideos.and.returnValue(of(mockMovieVideos));
  
    component.ngOnInit();
  
    expect(component.movie).toEqual(mockMovieDetails);
    expect(component.videoUrl).toBeDefined();
    expect(component.showVideo).toBe(true);
  });

  // HTTP ERROR


  //BACKGROUND DETAILS

  it('should return backdrop URL if movie is defined', () => {
    const mockMovie = {
      backdrop_path: 'path/to/backdrop.jpg',
    };
    component.movie = mockMovie as DetailsResult;
    const expectedUrl = 'https://image.tmdb.org/t/p/original' + mockMovie.backdrop_path;
    const backdropUrl = component.getBackdropUrl();
    expect(backdropUrl).toBe(expectedUrl);
  });

  it('should return an empty string if movie is undefined', () => {
    component.movie = undefined;
    const backdropUrl = component.getBackdropUrl();
    expect(backdropUrl).toBe('');
  });

  // MODAL VIDEO

  it('should open modal', () => {
    component.openModal();
    expect(component.isModalOpen).toBe(true);
  });

  it('should close modal', () => {
    component.closeModal();
    expect(component.isModalOpen).toBe(false);
  });

  
  

  
});