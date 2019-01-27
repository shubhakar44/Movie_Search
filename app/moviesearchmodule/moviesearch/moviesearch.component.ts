import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieSearchService } from '../../services/movie-search.service';
import { isNullOrUndefined } from 'util';
import { ImageSize } from '../../models/image-sizes';
import { MovieSearchLabel } from '../../models/moviesearchlabel';

@Component({
  selector: 'app-moviesearch',
  templateUrl: './moviesearch.component.html',
  styleUrls: ['./moviesearch.component.css']
})
export class MoviesearchComponent implements OnInit {

  @ViewChild('inputBox') searchField;
  inputText: string;
  isLoading: boolean = false;
  imageUrl: string;
  imageSize: ImageSize = new ImageSize();
  isMoviesPresent: boolean = false;
  moviesData: any = [];
  movieDetail: any;
  showMovieDetails: boolean = false;
  isApiError: boolean = false;
  label = MovieSearchLabel;

  constructor(private movieSearchService: MovieSearchService) { }

  ngOnInit() {
    this.setUpConfig();//set up image url and image size config
  }


  //function to fetch movies based on query
  searchMovies() {
    try {
      this.isApiError = false;
      this.showMovieDetails = false;
      //this.inputText = this.inputText.replace(' ', '+');
      if (!this.inputText || !this.inputText.trim()) {
        this.searchField.nativeElement.isInvalid = true;
        return;
      } else {
        this.searchField.nativeElement.isInvalid = false;
      }
      this.movieSearchService.searchMovies('&query=' + this.inputText).subscribe(res => {
        this.isMoviesPresent = false;

        this.moviesData = [];
        if (res) {
          if (res.total_results > 0) {
            this.moviesData = res.results;
            this.isMoviesPresent = true;
          }
        }
        
      }, (err) => {
        this.isMoviesPresent = false;
        this.moviesData = [];
        this.isApiError = true;
      });
    } catch (err) {
      this.isMoviesPresent = false;
      this.moviesData = null;
      this.isApiError = true;
    }
  }

  setUpConfig() {
    try {
      this.isLoading = true;
      this.movieSearchService.getConfig().subscribe((res) => {
        this.isLoading = false;
        this.isApiError = false;
        if (res) {
          this.movieSearchService.setImageSize(res.images)
          this.movieSearchService.setImageUrl(res.images.base_url)
          this.imageSize = this.movieSearchService.getImageSize();
          this.imageUrl = this.movieSearchService.getImageUrl();
        }

      }, (err) => {
        this.isLoading = false;
        this.isApiError = true;
      });
    } catch (err) {
      this.isLoading = false;
      this.isApiError = true;
    }
  }

  //function to fetch details of selected movie
  fetchMovieDetails(movie: any) {
    //append_to_response videos,images
    try {
      this.isApiError = false;
      this.movieSearchService.fetchMoreById(movie.id).subscribe(res => {
        if (res.id == movie.id) {
          this.movieDetail = res;
          this.showMovieDetails = true;
        }
      }, (err) => {
        this.isApiError = true;
      })
    } catch (err) {
      this.isApiError = true;
    }
  }

}
