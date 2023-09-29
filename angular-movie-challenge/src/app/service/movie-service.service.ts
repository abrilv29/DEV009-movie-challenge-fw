import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '16dfeb0f3e4049b632b795ff3d997f25';

  getDiscoveryMovie(): Observable<any> {
    //url de la api a consumir en este caso discoverid
    const url = `${this.apiUrl}?api_key=${this.apiKey}`;
    // Realizamos la solicitud GET y devolver los datos como un Observable

    return this.http.get(url);
  }

}
