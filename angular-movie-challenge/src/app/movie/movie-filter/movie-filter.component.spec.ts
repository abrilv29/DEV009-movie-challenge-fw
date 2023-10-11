import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFilterComponent } from './movie-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('MovieFilterComponent', () => {
  let component: MovieFilterComponent;
  let fixture: ComponentFixture<MovieFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieFilterComponent],
      imports: [HttpClientModule, FormsModule]
    });
    fixture = TestBed.createComponent(MovieFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
