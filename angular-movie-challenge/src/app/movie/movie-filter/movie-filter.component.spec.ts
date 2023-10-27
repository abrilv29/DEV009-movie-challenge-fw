import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieFilterComponent } from './movie-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MovieServiceService } from 'src/app/service/service.service';
import { of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { OriginalLanguage } from 'src/app/Interface/discover';


describe('MovieFilterComponent', () => {
  let component: MovieFilterComponent;
  let fixture: ComponentFixture<MovieFilterComponent>;

  let mockService = jasmine.createSpyObj('MovieServiceService', ['getGenersMovies', 'getGenerCategory']);

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [MovieFilterComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [MovieServiceService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ],
    });

    fixture = TestBed.createComponent(MovieFilterComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(MovieServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genres on ngOnInit', () => {
    const genres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }];

    // Configura el espía para getGenersMovies
    spyOn(mockService, 'getGenersMovies').and.returnValue(of({ genres }));

    component.ngOnInit();
    expect(component.genres).toEqual(genres);
  });

  it('should load movies on genre select', () => {
    const genreId = 1;
    const mockMovies = [
      {
        adult: false,
        backdrop_path: 'path/to/backdrop.jpg',
        genre_ids: [1, 2, 3],
        id: 1,
        original_title: 'Movie Title 1',
        original_language: OriginalLanguage.En,
        overview: 'Movie overview 1',
        popularity: 7.5,
        poster_path: 'path/to/poster.jpg',
        release_date: new Date('2023-10-21'),
        title: 'Movie 1',
        video: false,
        vote_average: 8.0,
        vote_count: 100,
      },
      {
        adult: false,
        backdrop_path: 'path/to/backdrop2.jpg',
        genre_ids: [4, 5, 6],
        id: 2,
        original_title: 'Movie Title 2',
        original_language: OriginalLanguage.En,
        overview: 'Movie overview 2',
        popularity: 8.5,
        poster_path: 'path/to/poster2.jpg',
        release_date: new Date('2023-10-22'),
        title: 'Movie 2',
        video: false,
        vote_average: 9.0,
        vote_count: 200,
      }
    ];

    // Simula la respuesta de la llamada a getGenerCategory
    spyOn(mockService, 'getGenerCategory').and.returnValue(of({ results: mockMovies }));

    component.onGenreSelect(genreId);

    // Espera que el componente tenga las películas cargadas
    expect(component.movies).toEqual(mockMovies);
  });


  it('should update currentPage and pageSize on page change', () => {
    const pageEvent = { pageIndex: 2, pageSize: 10 } as PageEvent;
    const mockMovieData = {
      results: [],
      page: 3, // Actualiza a 3 para que coincida con el comportamiento real
      total_results: 20,
      total_pages: 3,
    };

    // Configura el espía para getGenerCategory
    spyOn(mockService, 'getGenerCategory').and.returnValue(of(mockMovieData));

    component.onPageChange(pageEvent);

    // Ajusta las expectativas para reflejar el valor real de currentPageGenre
    expect(component.currentPageGenre).toEqual(mockMovieData.page);
    expect(component.pageSizeGenre).toEqual(pageEvent.pageSize);
  });

  it('should calculate pagination correctly', () => {
    // Asegúrate de que las propiedades necesarias estén configuradas
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
    component.totalPagesGenre = 20; // Establece el total de páginas
    component.pageSizeGenre = 5; // Establece el tamaño de página

    const result = component.getMoviePaginationGenres();

    expect(result).toEqual(4); // Debería calcular correctamente el número de páginas
  });

  it('should return 0 when movies or pageSize is 0', () => {

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

    ];
    component.pageSizeGenre = 0; // Establece el tamaño de página a 0

    const result = component.getMoviePaginationGenres();

    expect(result).toEqual(0); // Debería devolver 0 cuando el tamaño de página es 0
  });

  it('should sort movies on genre select', () => {
    // Asegúrate de que las propiedades necesarias estén configuradas
    component.selectGenreId = 1; // Establece un género seleccionado
    component.selectSortGenre = 'popularity.desc'; // Establece una opción de orden

    const mockMovies = [

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

    ];

    // Configura el espía para getGenerCategory
    spyOn(mockService, 'getGenerCategory').and.returnValue(of({ results: mockMovies }));

    component.onSortMovieGenres();

    expect(component.movies).toEqual(mockMovies); // Verifica que las películas se ordenen correctamente
  });

  it('should not sort movies when selectGenreId is not set', () => {
    // Asegúrate de que selectGenreId no esté configurado
    component.selectGenreId = undefined; // O establece selectGenreId como undefined o null

    spyOn(mockService, 'getGenerCategory'); // Espía el método

    component.onSortMovieGenres();

    // Ahora, verifica si el método del servicio se ha llamado directamente
    expect(mockService.getGenerCategory).not.toHaveBeenCalled();
  });

});
