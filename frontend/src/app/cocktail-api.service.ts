import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Drinks, DrinkShortcut, Drink} from './cocktail-api';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {
  // private cocktailDbUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
  private cocktailDbUrl = '/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': 'https://www.thecocktaildb.com',
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

  /**
   * Catch API empty response
   *
   * @remarks
   * Catching API empty response is needed, because API ex. does not return error on non-existent id.
   *
   * @param operation - name of the failed operation
   * @param result - optional value to return as the observable result
   */
     private catchEmpty<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }


  /** GET: gets Drinks Shortcuts from external CocktailDB API
   *
   * @param type - name of the alcoholic type of drink [Alcoholic, Non_Alcoholic]
  */
  getDrinks(type?: string): Observable<Drinks> {
    let requestURL = this.cocktailDbUrl +"filter.php?a=";
    if(type == null){
      type = "Non_Alcoholic";
    }
    requestURL = requestURL.concat(type.toLowerCase());
    return this.http.get<Drinks>(requestURL, this.httpOptions).pipe(
      tap(_ => console.log(`Fetched drinks of a=${type}`)),
      catchError(this.handleError<any>('getDrinks')),

    );
  }

  // /** GET: gets Drink Details from external CocktailDB API
  //  *
  //  * @param id - id of drink
  // */
  // getDrink(id : number): Observable<Drink>{
  //   let requestURL = this.cocktailDbUrl + "lookup.php?i="+id;
  //   return this.http.get<Drink>(requestURL, this.httpOptions).pipe(
  //     tap(_ => console.log(`Fetched drink of id=${id}`)),
  //     catchError(this.handleError<any>('getDrink'))
  //   );
  // }

 /** GET: gets Drink Details from external CocktailDB API
   *
   * @param id - id of drink
  */
  getDrink(id : string): Observable<Drink>{
    let requestURL = this.cocktailDbUrl + "lookup.php?i="+id;
    return this.http.get<Drink>(requestURL, this.httpOptions).pipe(
      tap(_ => console.log(`Fetched drink of id=${id}`)),
      catchError(this.handleError<any>('getDrink'))
    );
  }
}

