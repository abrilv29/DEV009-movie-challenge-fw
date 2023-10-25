import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {
  movieId: number = 565770;
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/original';
  movieImageUrl: string = ''; // Variable para la URL de la imagen

  constructor() { }

  ngOnInit(): void {
    // Construye la URL completa de la imagen
    this.movieImageUrl = this.imageBaseUrl + '/vhJ1yw90PJAIfcPwXO2ABW7SSHh.jpg';
  }
}
