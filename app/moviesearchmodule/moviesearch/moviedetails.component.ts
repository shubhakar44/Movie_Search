import { Component, OnInit, Input, Output, EventEmitter,SimpleChanges } from '@angular/core';
import { ImageSize } from '../../models/image-sizes';
import { MovieSearchService } from '../../services/movie-search.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { isNullOrUndefined } from 'util';
import { MovieSearchLabel } from '../../models/moviesearchlabel';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviesearch.component.css']
})
export class MovieDetailsComponent implements OnInit, OnChanges {

  imageSize: ImageSize = new ImageSize();
  imageUrl: string;
  movie: any;
  isVideoPresent: boolean;
  trailerObject: any;
  @Input() showDetails: boolean;
  @Input() movieDetails: any;
  @Output() hideDetails: EventEmitter<any> = new EventEmitter<any>();
  label = MovieSearchLabel;

  constructor(private movieSearchService: MovieSearchService) { }

  ngOnInit() {
    this.imageSize = this.movieSearchService.getImageSize();
    this.imageUrl = this.movieSearchService.getImageUrl();
    this.movie = this.movieDetails;
    this.checkTrailers(this.movie)
  }

  //onChanges to check if movie selected has changed
  ngOnChanges(changes: SimpleChanges) {
    try {
      if (!isNullOrUndefined(changes['movieDetails'])) {
        //if (isNullOrUndefined(changes.movieDetails.previousValue) && !isNullOrUndefined(changes.movieDetails.currentValue))
        //  this.movie = changes.movieDetails.currentValue;
        //else if (changes.movieDetails.currentValue.id != changes.movieDetails.previousValue.id) {
        //  this.movie = changes.movieDetails.currentValue;
        //}
        let currentValue = changes.movieDetails.currentValue;
        let prevValue = changes.movieDetails.previousValue;
        if (isNullOrUndefined(currentValue) && isNullOrUndefined(prevValue)) {

        } else if (!isNullOrUndefined(currentValue.id) && isNullOrUndefined(prevValue)) {
          this.movie = currentValue;
          this.checkTrailers(this.movie)
        } else if (currentValue.id != prevValue.id) {
          this.movie = changes.movieDetails.currentValue;
          this.checkTrailers(this.movie)
        }
      }
    } catch (err) {

    }
  }

  //function to check if movie selected has a trailer video attached
  checkTrailers(movie: any) {
    try {
      if (!isNullOrUndefined(movie.videos)) {
        let video = movie.videos.results;
        if (video.length > 0) {
          for (let i = 0; i < video.length; i++) {
            if (video[i].type == 'Trailer' && video[i].site == 'YouTube') {
              this.isVideoPresent = true;
              this.trailerObject = video[i];
              break;
            }
          }
        }
      }
    } catch (err) {

    }
  }

  openNewTab(site: string) {
    let url: string = '';
    switch (site) {
      case 'IMDB': {
        url = 'https://www.imdb.com/title/' + this.movie.imdb_id + '/'
        this.movieSearchService.openNewTab(url);
        break;
      }
      case 'YouTube': {
        url = 'https://www.youtube.com/watch?v=' + this.trailerObject.key;
        this.movieSearchService.openNewTab(url);
        break
      }
    }
  }

 //back search page
  goBack() {
    this.hideDetails.emit(null);
  }


}
