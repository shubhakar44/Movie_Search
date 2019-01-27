import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { LoggerService } from './logger-service';



@Injectable()
export class ApiService {

  url: string = environment.apiUrl
  apiKey: string = '?api_key=' + environment.apiKey;
  configUrl: string = environment.configUrl + '?api_key=' + environment.apiKey;
  //httpOptions = {
  //  headers: new HttpHeaders({
  //    'Content-Type': 'application/json'
  //  }),
  //};
  
  constructor(private http: HttpClient, private loggerService: LoggerService) {
  }

  get(hostUrl: string,params:string = ''): Observable<any> {
    this.loggerService.console("Request: " + hostUrl);
    let url = this.url + hostUrl + this.apiKey + params 
    return this.http.get(url).pipe(
      map(this.extractData),catchError(this.handleErrorObservable(this.constructor.name)));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleErrorObservable(operation = 'operation') {
    return (error: any): Observable<any> => {


      this.loggerService.console(error);

      this.loggerService.console(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error);
    };
  }

}
