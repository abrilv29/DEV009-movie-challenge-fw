import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, pipe } from 'rxjs';
import { Movie, MovieResult } from '../Interface/discover';
import { Genre, GenreResult } from '../Interface/genres';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http:HttpClient) { }

      private apiUrl = 'https://api.themoviedb.org/3';
      private apiKey = '16dfeb0f3e4049b632b795ff3d997f25';

 //tipado usando interface remplazando any

  getDiscoveryMovie(page:number): Observable<MovieResult> {
    //url de la api a consumir en este caso discoveri
     return this.http.get<MovieResult>(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&page=${page}`);
      
  }

  // GENERS MOVIES

  getGenersMovies(): Observable<GenreResult> {
   return this.http.get<GenreResult>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  // CATEGORY MOVIES FROM GENERS

  getGenerCategory(genreId?: number, page?:number): Observable<MovieResult> {
      //return this.http.get(`${this.apiKey}?api_key=${this.apiKey}&with_genres=28`);
      return this.http.get<MovieResult>(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`);
    }
}
