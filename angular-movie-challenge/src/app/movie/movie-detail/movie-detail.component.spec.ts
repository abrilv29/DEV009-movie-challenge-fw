import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {  of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MovieServiceService } from 'src/app/service/service.service';
import { MovieDetailComponent } from './movie-detail.component';
import { DetailsResult } from 'src/app/Interface/details';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const mockService = jasmine.createSpyObj('MovieServiceService', ['getMovieDetails']);

  beforeEach(() => {
    const paramMap = new Map<string, number>();
    paramMap.set('id', 1);

    const mockActivatedRoute = {
      snapshot: { paramMap: convertToParamMap(paramMap) }
    };
    TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MovieServiceService, useValue: mockService },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ],
    });

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display movie details based on the route parameter', () => {
    const mockMovieData: DetailsResult = {
      id: 1,
      title: 'Título de la película',
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

    // Configura el objeto espía para devolver un observable de mockMovieData
    mockService.getMovieDetails.and.returnValue(of(mockMovieData));
    // Activa la detección de cambios para que los valores del componente se actualicen
    fixture.detectChanges();
    expect(component.movie).toEqual(mockMovieData);

  });
});
