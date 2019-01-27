import { Component } from '@angular/core';
import { MovieSearchLabel } from './models/moviesearchlabel';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-app';
  movieSearchLabel = MovieSearchLabel;
}
