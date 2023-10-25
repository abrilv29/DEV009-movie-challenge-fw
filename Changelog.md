# Changelog

## 1.1.1 - 2023-10-25

### Sprint learnings

- Aprendi a usar angular material 
- Aprendi a usar el lazyload para rutas hijas
- Aprendi de test usando jasmin
- Aprendi a dar estilos en sass extencion (scss)


* f9ad22e Merge pull request #11 from abrilv29/test (Abril) 2023-10-24
* 0d20eeb readme actualizado parte 1 (Abril) 2023-10-24
* 448cb11 Merge pull request #10 from abrilv29/test (Abril) 2023-10-24
* 52a85db test component movie-list (Abril) 2023-10-24
* 28f0b5e Boton cerrar ventana modal cambios en css (Abril) 2023-10-23
* ce8b48c Cambios en el router-movie (Abril) 2023-10-23
* 2b27e57 Ultimos cambios en sidenav css (Abril) 2023-10-23
* cc09634 Merge pull request #9 from abrilv29/details-movie (Abril) 2023-10-23
* 52cc7ca Movie details video (Abril) 2023-10-23
* f09e5f9 Cambios en el css details (Abril) 2023-10-23
* b9d3993 Merge pull request #8 from abrilv29/details-movie (Abril) 2023-10-23
* ad1558f Cambios en el componente movie-details parte1 (Abril) 2023-10-23
* 07c1d8f Merge pull request #7 from abrilv29/genres-movies (Abril) 2023-10-23
* 98ee11d Cambios en movie-filter genres parte3 (Abril) 2023-10-23
* fceded2 Cambios en movie-filter genres parte2 (Abril) 2023-10-23
* 3e61296 Cambios en movie-filter genres parte1 (Abril) 2023-10-23
* 7ca0823 Merge pull request #6 from abrilv29/sidenav (Abril) 2023-10-23
* 690e908 Cambios en el sidenav parte1 (Abril) 2023-10-23
* 0b4880f Merge pull request #5 from abrilv29/cards-style (Abril) 2023-10-23
* d36fed2 Cambios en el select movie-list (Abril) 2023-10-23


## 1.1.1 - 2023-10-18

### Sprint learnings

- Aprendi a usar angular material 
- Aprendi a usar el lazyload para rutas hijas
- Aprendi de test usando jasmin
- Aprendi a dar estilos en sass extencion (scss)

### Added

- Instale y configure angualar material usarlo en mis componentes
- Usando  la libreria sidenav de  angular material cree un lazyload para rutas children y asi poder cargar los componentes de manera peresosa.
- Cree mi primer test usando jasmin y creando mocks
- Le di estilos a mi component movie-list con sass para crear cards con angular material.

### Fixed

- Se resuleve la manera en que queria mostrar los componentes en el sidenav con la carga peresosa.
- Implemente un sistema de rutas en movie.routing children
- En los test se implemento el uso de jasmine.createSpyObj para poder simular el request y el serve asi poder mockear





## 1.1.0 - 2023-10-11

### Sprint learnings

- Aprendi a crear una interface para alamcenar los tipos de datos en typescrit y asi poderlos usar en un observable
- Aprendi a comunicar componentes usando  BehaviorSubjec.
- logre ordenar la data con el params sort_by 
- logre hacer el enpoint de detail/movie{movie_id} y mostrar la sinopsis de las movies.

### Added

- Cree una carpeta interface donde almacena los archivos de la data que se va utilizar para el tipado de datos.
- Comunique mi component movie-list con search para buscar las movies por el nombre
- Agregue a mi router la busqueda por id de las peliculas para que apuntara al enpoint de detail/movie{movie_id}. y poder mostrar lo details.
- Corregi errores de los test para poder correr npm run test.


## 1.0.1 - 2023-10-03

### Sprint learnings

- Aprendimos a instalar Angular 
- Investigue sobre el manejo de la logica del Framework
- Investigue como se usa HTTPClient y un observable
- Investigue como se crea un component y service
- Ejecutamos el API Mock de ThemovieDB e hice una peticiones de prueba usando Postman para traer la data discover/movie.

### Added
- Cree el routing de la navegacion y lo integre en un nav usando bootstrap
- Creer la interfaz de las movies sin estilos pero logre completar el hito 1 con la data de discover/movie y la paginación en el componente movie-list.
- Complete el Hito 2 de las geners mostrados en un select aun sin usar estilos.

### Fixed

- Resolvi la paginación ya que no me generaba el cambio de paginas.

### Commit Log

* Cambios en la paginacion component movie-list
* Hito 2 
* Router e hito 1
* Cambios en el README

## 1.0.0 - 2023-09-26

### Sprint learnings

-Planificar mi organizacion en el proyecto 
- Leer los Hitos a desarrollar 
- Crear mi cuenta en THEMOVIEDB para la api_key

