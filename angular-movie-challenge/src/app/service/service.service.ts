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

  getDiscoveryMovie(): Observable<Movie[]> {
    //url de la api a consumir en este caso discoveri
    return this.http.get<MovieResult>(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}`).pipe(
      map((result: MovieResult) => result.results)
    );
      
  }




  //genersMovies

  getGenersMovies(genreId?: number): Observable<any> {
    let params: any = {
      api_key: this.apiKey, // Cambiar apiKey a api_key
    };
  
    // Agregar el filtro por genreId si se proporciona
    if (genreId !== undefined) {
      params.with_genres = genreId.toString();
    }
  
    return this.http.get(`${this.apiUrl}/genre/movie/list`, { params });


  }

  //Geners movies 

  getGenerCategory(genreId?: number, page:number = 1): Observable<any> {
    //return this.http.get(`${this.apiKey}?api_key=${this.apiKey}&with_genres=28`);
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=es&page=${page}`);
  }

 // private apiUrl = 'https://api.themoviedb.org/3/genre/movie/list';

 //search movie

getSearcMovie(data:any): Observable<any> {

  return this.http.get(`${this.apiUrl}/searchmovie?api_key=${this.apiKey}&query=${data.movieName}`);
}

}

