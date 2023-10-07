import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie, MovieResult } from '../Interface/discover';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http:HttpClient) { }

      private apiUrl = 'https://api.themoviedb.org/3';
      private apiKey = '16dfeb0f3e4049b632b795ff3d997f25';

 //tipado usando interface remplazando any

  getDiscoveryMovie(page:Number): Observable<MovieResult> {
    //url de la api a consumir en este caso discoveri
     return this.http.get<MovieResult>(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&page=${page}`);
      
  }

  // GENERS MOVIES

  getGenersMovies(genreId?: number): Observable<Movie[]> {
   let url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}`;
   if(genreId){
       url += `&with_genres=${genreId}`;
   }

   return this.http.get<MovieResult>(url).pipe(
       map((res: MovieResult) => res.results)
   );


  }

  // CATEGORY MOVIES FROM GENERS

  /*getGenerCategory(genreId: number, page:number = 1): Observable<MovieResult> {
    //return this.http.get(`${this.apiKey}?api_key=${this.apiKey}&with_genres=28`);
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=es&page=${page}`);
  }*/


}

