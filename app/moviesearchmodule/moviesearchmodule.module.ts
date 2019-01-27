import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesearchComponent } from './moviesearch/moviesearch.component';
import { MoviesearchmoduleRoutingModule } from './moviesearch.routing.module';
import { MovieSearchService } from '../services/movie-search.service';
import { FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './moviesearch/moviedetails.component';


@NgModule({
  declarations: [MoviesearchComponent, MovieDetailsComponent],
  imports: [
    FormsModule,
    CommonModule,
    MoviesearchmoduleRoutingModule
  ],
  providers: [MovieSearchService]
})
export class MoviesearchmoduleModule { }
