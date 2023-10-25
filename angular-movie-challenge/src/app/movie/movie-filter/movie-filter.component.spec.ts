import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFilterComponent } from './movie-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MovieServiceService } from 'src/app/service/service.service';

describe('MovieFilterComponent', () => {
  let component: MovieFilterComponent;
  let fixture: ComponentFixture<MovieFilterComponent>;
  let movieService: MovieServiceService;

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
    movieService = TestBed.inject(MovieServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genres on initialization', () => {
    const genres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }];
    spyOn(movieService, 'getGenersMovies').and.returnValue(of({ genres }));

    fixture.detectChanges();

    expect(component.genres).toEqual(genres);
  });

  it('should load movies when a genre is selected', () => {
    const genreId = 1;
    const movies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];
    spyOn(movieService, 'getGenerCategory').and.returnValue(of({ results: movies, page: 1, total_results: 2 }));

    component.onGenreSelect(genreId);

    expect(component.movies).toEqual(movies);
  });

  it('should change current page on page change', () => {
    const event = { pageIndex: 2, pageSize: 10 } as any; // Simulate PageEvent
    component.selectGenreId = 1; // Set a genre

    component.onPageChange(event);

    expect(component.currentPageGenre).toBe(3); // pageIndex + 1
    expect(component.pageSizeGenre).toBe(10);
  });

  it('should calculate the total number of pages correctly', () => {
    component.totalPagesGenre = 15;
    component.pageSizeGenre = 5;

    const result = component.getMoviePaginationGenres();

    expect(result).toBe(3);
  });
});
