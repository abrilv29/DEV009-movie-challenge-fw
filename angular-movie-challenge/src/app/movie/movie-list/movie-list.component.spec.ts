import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MovieServiceService } from 'src/app/service/service.service';
import { of } from 'rxjs';
import { OriginalLanguage } from 'src/app/Interface/discover';
import { PageEvent } from '@angular/material/paginator';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: MovieServiceService;

  const mockMovieData = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: 'path/to/backdrop.jpg',
        genre_ids: [1, 2, 3],
        id: 1,
        original_language: OriginalLanguage.En, 
        original_title: 'Original Title',
        overview: 'Movie overview',
        popularity: 7.5,
        poster_path: 'path/to/poster.jpg',
        release_date: new Date('2023-10-21'),
        title: 'Movie Title',
        video: false,
        vote_average: 8.0,
        vote_count: 100,
      },
    ],
    total_pages: 5,
    total_results: 25,

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [HttpClientModule, FormsModule, HttpClientModule], // Agrega HttpClientTestingModule
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: MovieServiceService }, 
      ],
    });


    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieServiceService); // Inyecta el servicio
    /*fixture.detectChanges();*/
  });

  it('should initialize the component and fetch movies', () => {

    spyOn(movieService, 'getDiscoveryMovie').and.returnValue(of(mockMovieData));
    
    fixture.detectChanges();
    
    // Verifica si se ha llamado al método getDiscoveryMovie y si los datos de películas se han asignado correctamente
    expect(movieService.getDiscoveryMovie).toHaveBeenCalled();
    expect(component.movies).toEqual(mockMovieData.results);
    expect(component.currentPage).toBe(mockMovieData.page);
    expect(component.totalPages).toBe(mockMovieData.total_results);
  });

it('should update currentPage and pageSize on page change', () => {
  const pageEvent = { pageIndex: 2, pageSize: 10 } as PageEvent;
  const mockMovieData = {
    results: [], 
    page: 2,
    total_results: 20,
    total_pages: 3, 
  };

  spyOn(movieService, 'getDiscoveryMovie').and.returnValue(of(mockMovieData));
  
  component.onPageChange(pageEvent);
  
  expect(component.currentPage).toEqual(mockMovieData.page);
  expect(component.pageSize).toEqual(pageEvent.pageSize);
});

it('should return the correct pagination value', () => {
  component.movies = [
    {
      adult: false,
      backdrop_path: 'path/to/backdrop.jpg',
      genre_ids: [1, 2, 3],
      id: 1,
      original_language: OriginalLanguage.En, 
      original_title: 'Original Title',
      overview: 'Movie overview',
      popularity: 7.5,
      poster_path: 'path/to/poster.jpg',
      release_date: new Date('2023-10-21'),
      title: 'Movie Title',
      video: false,
      vote_average: 8.0,
      vote_count: 100,
    },
    // Agrega más películas de ejemplo si es necesario...
  ];
  
  component.pageSize = 5; // Configura el pageSize según lo necesario para esta prueba
  component.totalPages = 10; // Configura el totalPages según lo necesario para esta prueba

  const result = component.getMoviePagination();

  expect(result).toBe(2);
});


it('should call loadMovie with the selected sort option', () => {
  const sortOption = 'popularity.desc'; // Establece un valor de ejemplo para sortOption

  spyOn(component, 'loadMovie'); // Espía el método loadMovie

  component.selectSortOption = sortOption;
  component.onSortMovie();

  expect(component.loadMovie).toHaveBeenCalledWith(sortOption);
});

it('should fetch movies with the specified sort option', () => {
  const sortOption = 'popularity.desc'; // Establece un valor de ejemplo para sortOption
  const mockMovieData = {
    results: [], 
    page: 2,
    total_results: 20,
    total_pages: 3, 
  };

  spyOn(movieService, 'getMovieSort').and.returnValue(of(mockMovieData));

  component.loadMovie(sortOption);

  expect(movieService.getMovieSort).toHaveBeenCalledWith(sortOption);
  expect(component.movies).toEqual(mockMovieData.results);
});


});
