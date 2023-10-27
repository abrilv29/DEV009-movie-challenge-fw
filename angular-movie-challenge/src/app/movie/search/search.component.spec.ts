import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { SearchComponent } from './search.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieServiceService } from 'src/app/service/service.service';
import { ComunicationMovieService } from 'src/app/service-comunication/comunication-movie.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  // Mock de MovieServiceService
  let mockService = {
    getSearchMovie: (term: string) => of({
      page: 1,
      total_pages: 1,
      total_results: 1,
      results: [
        {
          title: 'Test Movie',
          adult: false,
          backdrop_path: '/path',
          genre_ids: [1, 2],
          id: 1,
        },
      ],
    }),
  };


  // Mock de ComunicationMovieService
  const mockComunityMovieService = {
    updateSearchResults: () => { },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [
        { provide: MovieServiceService, useValue: mockService },
        { provide: ComunicationMovieService, useValue: mockComunityMovieService },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ],
    });
    fixture = TestBed.createComponent(SearchComponent);
    mockService = TestBed.inject(MovieServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSearchMovie when search form value changes', fakeAsync(() => {

    const term = 'testTerm';
    spyOn(mockService, 'getSearchMovie').and.callThrough();

    component.searchForm.get('texto')?.setValue(term);
    fixture.detectChanges();

    tick(300); // Espera el tiempo de debounceTime

    expect(mockService.getSearchMovie).toHaveBeenCalledWith(term);
  }));

  /*it('should call onSearchMovie when search button is clicked', () => {
    // Establece un valor en el formulario antes de hacer clic en el botón
    component.searchForm.get('texto')?.setValue('test search term');
  
    // Llama al método
    component.onSearchMovie();
  
    // Ahora espera que el spy haya sido llamado con el valor correcto
    const searchTermsSpy = spyOn(component.searchTerms, 'next');
  
    expect(searchTermsSpy).toHaveBeenCalledWith('test search term');
  }); */

  it('should call onSearchMovie when search button is clicked', () => {
    spyOn(component, 'onSearchMovie');
  
    // Encuentra el botón por su ID
    const button = fixture.debugElement.nativeElement.querySelector('#searchButton');
  
    // Simula un clic en el botón
    button.click();
  
    // Verifica que la función onSearchMovie se haya llamado
    expect(component.onSearchMovie).toHaveBeenCalled();
  });

});
