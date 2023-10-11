import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [HttpClientModule, FormsModule ]
    });
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
