import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MovieServiceService } from 'src/app/service/service.service';
import { MovieDetailComponent } from './movie-detail.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DetailsResult } from 'src/app/Interface/details';
import { Site, Video } from 'src/app/Interface/video';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const mockService = jasmine.createSpyObj('MovieServiceService', ['getMovieDetails', 'getMovieVideos']);

    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
            params: of({ id: '1' })
          }
        },
        { provide: MovieServiceService, useValue: mockService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /* it('should use a simulated route parameter', () => {
    const simulatedParamMap = convertToParamMap({ id: '1' });
    route = TestBed.inject(ActivatedRoute);
    route.snapshot.params = simulatedParamMap;

    fixture.detectChanges();

    expect(component.movieId).toBe(1);
  });

  it('should load movie details', () => {
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
  
    const getMovieDetailsSpy = jasmine.createSpy('getMovieDetails').and.returnValue(of(mockMovieDetails));

    // Reemplaza el espía en el objeto movieServiceMock
    const movieServiceMock = TestBed.inject(MovieServiceService);
    movieServiceMock.getMovieDetails = getMovieDetailsSpy;
    
    component.ngOnInit();

    expect(component.movie).toEqual(mockMovieDetails);
  });

  it('should load movie videos', () => {
    const mockVideos = {
      results: [
        {
          name: "Nombre del video",
          site: Site.YouTube, // Otra opción válida de Site si corresponde
          size: 123, // Tamaño del video
          id: "1", // ID del video
          type:"trailer",
        },
        // Otros objetos VideoResult simulados si es necesario
      ]
    };
    
    const getMovieVideosSpy = jasmine.createSpy('getMovieVideos').and.returnValue(of(mockVideos));

    // Reemplaza el espía en el objeto movieServiceMock
    const movieServiceMock = TestBed.inject(MovieServiceService);
    movieServiceMock.getMovieVideos = getMovieVideosSpy;
    
    component.ngOnInit();

    expect(component.videoUrl).toBeDefined();
    expect(component.showVideo).toBe(true);
  });*/

});
