import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Drinks, DrinkShortcut, Drink} from './cocktail-api';
import { Observable } from 'rxjs';


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



  getDrinks(): Observable<Drinks> {
    let requestURL = this.cocktailDbUrl +"filter.php?a=Alcoholic";
    return this.http.get<Drinks>(requestURL, this.httpOptions);
  }

  // getDrinks(alcoholicCategory: String | undefined = undefined): Observable<Drinks> {
  //   let requestURL = this.cocktailDbUrl +"filter.php?a=";
  //   if(alcoholicCategory){
  //     requestURL += alcoholicCategory.toLowerCase()
  //   }
  //   else {
  //     requestURL += "Non_Alcoholic";
  //   }
  //   return this.http.get<Drinks>(requestURL, this.httpOptions);
  // }

  getDrink(id : number): Observable<Drink>{
    let requestURL = this.cocktailDbUrl + "lookup.php?i="+id;
    return this.http.get<Drink>(requestURL, this.httpOptions);
  }
}

