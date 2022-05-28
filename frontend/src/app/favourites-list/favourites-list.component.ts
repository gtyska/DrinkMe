import { Component, OnInit, Renderer2 } from '@angular/core';
import { Cocktails, CocktailShortcut } from '../cocktail-api';
import { Drink } from '../drinkme';
import { CocktailApiService } from '../cocktail-api.service';
import { DrinkmeService } from '../drinkme.service';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss']
})
export class FavouritesListComponent implements OnInit {
  favouriteDrinks: Drink[] = [];
  drinks: Cocktails = {drinks: []};
  cocktailsGroups: CocktailShortcut[][] = [];
  selectedCocktail?: CocktailShortcut;
  constructor(
    private cocktailApiService: CocktailApiService,
    private drinkmeService: DrinkmeService,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.getFavouriteDrinks();
    console.log('COCK', this.cocktailsGroups);
  }

  getFavouriteDrinks(){
    // let favDrinks: Drink[];
    this.drinkmeService.getDrinks().subscribe(
      data => {
        this.favouriteDrinks = data;
        console.log(data);

        this.getRecipes();
      }
    );

  }

  getRecipes(){
    let drinkGroups: CocktailShortcut[];
    let cocktail: CocktailShortcut;
    let count = 0;
    console.log('favourite drinks', this.favouriteDrinks);
    this.favouriteDrinks.forEach(element => {
        this.cocktailApiService.getCocktail(element.cocktailId).subscribe(
          data => {
            cocktail = {
              idDrink : data.drinks[0].idDrink,
              strDrink : data.drinks[0].strDrink,
              strDrinkThumb : data.drinks[0].strDrinkThumb
            };
            if (count % 3 == 0) {
              let cocktailGroup: CocktailShortcut[] = [];
              this.cocktailsGroups.push(cocktailGroup);
            }
            const idx = Math.floor(count / 3);
            this.cocktailsGroups[idx].push(cocktail);
            count += 1
            console.log("cocktail", cocktail);
          }
        );
      }
    );
  }

  makeListOfLists(drinkGroups: CocktailShortcut[]) {
    let count = 0;
    let drinkGroup: CocktailShortcut[] = [];
    drinkGroups.forEach(element => {
      count++;
      drinkGroup.push(element);
      if(count === 3){
        this.cocktailsGroups.push(drinkGroup);
        count = 0;
        drinkGroup = [];
      }
      }
    );
  }

  onSelect(drink: CocktailShortcut): void {
    this.selectedCocktail = drink;
  }
}
