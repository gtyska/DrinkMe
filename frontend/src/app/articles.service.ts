import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private drinkmeUrl = 'http://localhost:8080/api/articles/'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
  };

  /**
   * Handle HTTP failed operation.
   *
   * @param operation - name of the failed operation
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET: gets Drink from DrinkMe API
   *
   * @param type - name of the alcoholic type of drink [Alcoholic, Non_Alcoholic]
  */
  getArticles(): Observable<Article[]> {
    let requestURL = this.drinkmeUrl + "data";
    return this.http.get<Article[]>(requestURL, this.httpOptions).pipe(
      tap(_ => console.log(`[DrinkMe] Fetched Articles`)),
      catchError(this.handleError<any>('getArticles'))
    );
  }
}
