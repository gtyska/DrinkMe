import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Drink} from './drinkme';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkmeService {
  private drinkmeUrl = 'http://localhost:8080/api/drinks'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS'
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
  getDrink(cocktailId: String): Observable<Drink> {
    let requestURL = this.drinkmeUrl + "/cocktailId=" + cocktailId;
    return this.http.get<Drink>(requestURL, this.httpOptions).pipe(
      tap(_ => console.log(`[DrinkMe] Fetched drink id=${cocktailId}`)),
      catchError(this.handleError<any>('getDrink'))
    );
  }

  /** GET: gets Drink from DrinkMe API
   *
   * @param type - name of the alcoholic type of drink [Alcoholic, Non_Alcoholic]
  */
  getDrinks(): Observable<Drink[]> {
    let requestURL = this.drinkmeUrl;
    return this.http.get<Drink[]>(requestURL, this.httpOptions).pipe(
      tap(_ => console.log(`[DrinkMe] Fetched drinks`)),
      catchError(this.handleError<any>('getDrinks'))
    );
  }

  /** GET: gets Drink from DrinkMe API
   *
   * @param type - name of the alcoholic type of drink [Alcoholic, Non_Alcoholic]
  */
  createDrink(drink: Drink): Observable<Drink> {
    let requestURL = this.drinkmeUrl;
    return this.http.post<Drink>(requestURL,  drink, this.httpOptions).pipe(
      tap(_ => console.log(`[DrinkMe] drink created`)),
      catchError(this.handleError<any>('createDrink'))
    );
  }

  deleteDrink(id: number) {
    let requestURL = this.drinkmeUrl + "/" + id.toString();
    console.log('[DrinkMe] delete by url', requestURL);
    return this.http.delete(requestURL, this.httpOptions).pipe(
      tap(_ => console.log(`[DrinkMe] drink deleted`)),
      catchError(this.handleError<any>('deleteDrink'))
    );
  }
}
