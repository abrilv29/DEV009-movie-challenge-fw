import { TestBed } from '@angular/core/testing';
import { ComunicationMovieService } from './comunication-movie.service';
import { Movie, OriginalLanguage } from '../Interface/discover';
import { firstValueFrom, take } from 'rxjs';

describe('ComunicationMovieService', () => {
  let service: ComunicationMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunicationMovieService],
    });
    service = TestBed.inject(ComunicationMovieService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial empty searchResults$ BehaviorSubject', async () => {
    const results = await firstValueFrom(service.searchResults$);
    expect(results).toEqual([]);; // Asegurarse de que al principio esté vacío
  });

  it('should update searchResults$', async () => {
    const mockResults = [
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

    service.updateSearchResults(mockResults);
    const results: Movie[] = await firstValueFrom(service.searchResults$);
    expect(results).toEqual(mockResults);
  });
});
