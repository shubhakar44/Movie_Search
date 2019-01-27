import { Injectable } from "@angular/core";
import { ApiService } from "../core/api-service";
import { Observable } from "rxjs/internal/Observable";
import { ImageSize } from "../models/image-sizes";



@Injectable()

export class MovieSearchService {

  imageSize: ImageSize = new ImageSize();
  imageUrl: string;
  globalWindowObject = window;
  constructor(private apiService: ApiService) { }

  searchMovies(params: string): Observable<any> {
    let url = 'search/movie';
    return this.apiService.get(url, params);
  }

  getConfig(configUrl: string = '') {
    let url = 'configuration' + configUrl;
    return this.apiService.get(url);
  }

  fetchMoreById(id: any) {
    let url = 'movie/' + id;
    let params = '&append_to_response=videos,images'
    return this.apiService.get(url, params);
  }

  getWindowObject() {
    return this.globalWindowObject;
  }

  setImageSize(images:any) {
    this.imageSize.backdrop_sizes = images.backdrop_sizes[1];
    this.imageSize.logo_sizes = images.logo_sizes[0];
    this.imageSize.poster_sizes = images.poster_sizes[1];
    this.imageSize.profile_sizes = images.profile_sizes[0];
    this.imageSize.still_sizes = images.still_sizes[0];
  }

  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  getImageSize() {
    return this.imageSize;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  openNewTab(url: string) {
    this.globalWindowObject.open(url);
  }
}
