import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MovieServiceService } from 'src/app/service/service.service';
import { MovieDetailComponent } from './movie-detail.component';
import { DetailsResult, GenreDetails } from 'src/app/Interface/details';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  // Crear un mock del servicio
  const mockService = {
    getMovieDetails: (movieId: number) => {
      if (movieId === 1) {
        return of({
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
        });
      } else {
        return of(null); // Devuelve null para otros valores de movieId
      }
    },
  };
  
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
      ]
    });

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display movie details based on the route parameter', () => {
    // Activa la detección de cambios para que los valores del componente se actualicen
    fixture.detectChanges();

    // Realiza aserciones en el componente
    expect(component).toBeTruthy();

    // Simula una respuesta válida del servicio con datos simulados
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
    
    
    // Establece la respuesta simulada en el servicio
    spyOn(mockService, 'getMovieDetails').and.returnValue(of(mockMovieData));


    // Realiza aserciones en el componente para verificar que los datos se muestren correctamente
    expect(component.movie).toEqual(mockMovieData);

    // Asegúrate de que detailsGenres se muestre correctamente en la plantilla HTML
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Géneros: Acción, Aventura');

    // Verifica que otros detalles se muestren en la plantilla HTML
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Título de la película');
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Descripción de la película');
    // ...otras aserciones de detalles de la película
  });
});
