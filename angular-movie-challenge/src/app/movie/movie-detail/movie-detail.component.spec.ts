import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MovieServiceService } from 'src/app/service/service.service';
import { MovieDetailComponent } from './movie-detail.component';
import { DomSanitizer } from '@angular/platform-browser';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieService: MovieServiceService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }), // Simula los parámetros de la ruta
          },
        },
        MovieServiceService, // Añade tus servicios aquí
        DomSanitizer,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieServiceService);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovieDetails and set movie details', () => {
    const spyGetMovieDetails = spyOn(movieService, 'getMovieDetails');
  
    component.ngOnInit();
  
 
    expect(spyGetMovieDetails).toHaveBeenCalledWith(component.movieId);

    const mockMovieDetails = {
      id: 1,
      backdrop_path: '/ruta/imagen.jpg',
      title: 'Título de la película',
      overview: 'Descripción de la película',
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
      ],
      poster_path: '/ruta/imagen.jpg',
      original_title: '',
      vote_average: 0,
      vote_count: 0,
      release_date: new Date(),
    };
  
    // Configura el espía para que devuelva los datos de prueba
    spyGetMovieDetails.and.returnValue(of(mockMovieDetails));
  
    // Llama a component.ngOnInit nuevamente después de espiar el servicio
    component.ngOnInit();
  
    // Espera a que se complete la suscripción y se actualice la vista
    fixture.detectChanges();

    expect(component.movie).toEqual(mockMovieDetails);
    expect(component.detailsGenres).toBe('Action, Adventure');
  });
  
});
