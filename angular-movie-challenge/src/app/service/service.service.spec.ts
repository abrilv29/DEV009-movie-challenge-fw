import { TestBed } from '@angular/core/testing';
import { MovieServiceService } from './service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MovieResult, OriginalLanguage } from '../Interface/discover';
import { GenreResult } from '../Interface/genres';
import { DetailsResult } from '../Interface/details';
import { Site, Video } from '../Interface/video';

describe('ServiceService', () => {
  let service: MovieServiceService ;
  let http:  HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpClientTestingModule],
      providers: [MovieServiceService],
    });
    service = TestBed.inject(MovieServiceService );
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // DISCOVERY MOVIES

  it('should fetch discovery movies', () => {
    const page = 1;
    const mockDataService = { 
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

    // Simula el método get de HttpClient
    spyOn(http, 'get').and.returnValue(of(mockDataService));

    service.getDiscoveryMovie(page).subscribe(data => {
      expect(data).toEqual(mockDataService);
    });

    // Verifica que se llamó a http.get con la URL correcta
    expect(http.get).toHaveBeenCalledWith(`${service['apiUrl']}/discover/movie?api_key=${service['apiKey']}&page=${page}`);
  });

  // GENERS MOVIES

  it('should get genre movies', () => {
    const mockGenreData: GenreResult = {
      genres: [
        {
          id: 1,
          name: 'Acción',
        },
        {
          id: 2,
          name: 'Aventura',
        },
        // Agrega más géneros simulados si es necesario
      ],
    };
    spyOn(http, 'get').and.returnValue(of(mockGenreData));
    service.getGenersMovies().subscribe((data) => {
      expect(data).toEqual(mockGenreData);
    });

    expect(http.get).toHaveBeenCalledWith(`${service['apiUrl']}/genre/movie/list?api_key=${service['apiKey']}`);

  });

   // CATEGORY MOVIES FROM GENERS

   it('should get category movies from genres', () => {
    const genreId = 28; // El ID del género que deseas probar
    const page = 1; // El número de página que deseas probar
    const sortGenres = 'popularity.desc'; // El orden de clasificación que deseas probar
    const mockCategoryData: MovieResult = {      
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
    spyOn(http, 'get').and.returnValue(of(mockCategoryData));
    service.getGenerCategory(genreId, page, sortGenres).subscribe((data) => {
      expect(data).toEqual(mockCategoryData);
    });

    expect(http.get).toHaveBeenCalledWith( `${service['apiUrl']}/discover/movie?api_key=${service['apiKey']}&with_genres=${genreId}&sort_by=${sortGenres}&page=${page}`);
  });

  // SORT THE MOVIES

  it('should get sorted movies', () => {
    const sortMovies = 'popularity.desc'; // El tipo de orden que deseas probar
    const mockSortedData: MovieResult = {
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
    spyOn(http, 'get').and.returnValue(of(mockSortedData));
    service.getMovieSort(sortMovies).subscribe((data) => {
      expect(data).toEqual(mockSortedData);
    });
    expect(http.get).toHaveBeenCalledWith( `${service['apiUrl']}/discover/movie?api_key=${service['apiKey']}&sort_by=${sortMovies}`);
  
  });

  // SERCH THE MOVIES

  it('should search for movies', () => {
    const searchText = 'The Avengers'; // El texto de búsqueda que deseas probar
    const mockSearchData: MovieResult = {
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
  
  // Espiar el método http.get
  spyOn(http, 'get').and.returnValue(of(mockSearchData));

  // Llamar al método que deseas probar
  service.getSearchMovie(searchText).subscribe((data) => {
    expect(data).toEqual(mockSearchData);
  });

  // Verificar que el método http.get se llamó con la URL correcta
  expect(http.get).toHaveBeenCalledWith(`${service['apiUrl']}/search/movie?api_key=${service['apiKey']}&query=${encodeURIComponent(searchText)}`);
});
  
  // DETAILS MOVIES 

it('should get movie details', () => {
  const movieId = 123; // ID de la película que deseas probar
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

  // Espiar el método http.get
  spyOn(http, 'get').and.returnValue(of(mockMovieDetails));

  // Llamar al método que deseas probar
  service.getMovieDetails(movieId).subscribe((data) => {
    expect(data).toEqual(mockMovieDetails);
  });

  // Verificar que el método http.get se llamó con la URL correcta
  expect(http.get).toHaveBeenCalledWith(`${service['apiUrl']}/movie/${movieId}?api_key=${service['apiKey']}`);
});


// TRAILER MOVIES

it('should get movie videos', () => {
  const movieId = 123;
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
  };

  // Espiar el método http.get
  spyOn(http, 'get').and.returnValue(of(mockMovieVideos));

  // Llamar al método que deseas probar
  service.getMovieVideos(movieId).subscribe((data) => {
    expect(data).toEqual(mockMovieVideos);
  });

  // Verificar que el método http.get se llamó con la URL correcta
  expect(http.get).toHaveBeenCalledWith(`${service['apiUrl']}/movie/${movieId}/videos?api_key=${service['apiKey']}`);
});

});// end describe
