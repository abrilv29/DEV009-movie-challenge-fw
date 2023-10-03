import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http:HttpClient) { }

      private apiUrl = 'https://api.themoviedb.org/3';
      private apiKey = '16dfeb0f3e4049b632b795ff3d997f25';


  //slider trending

  getsliderTrending(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}&language=es`);
  }

  getDiscoveryMovie(page: number): Observable<any> {
    //url de la api a consumir en este caso discoverid
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&page=${page}`;
    // Realizamos la solicitud GET y devolver los datos como un Observable

    return this.http.get(url);
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

  //action movies 

  getGenerCategory(genreId?: number, page:number = 1): Observable<any> {
    //return this.http.get(`${this.apiKey}?api_key=${this.apiKey}&with_genres=28`);
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=es&page=${page}`);
  }

 // private apiUrl = 'https://api.themoviedb.org/3/genre/movie/list';

}
