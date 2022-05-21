import { Component, OnInit } from '@angular/core';
import { DrinkShortcut, Drinks } from '../cocktail-api';
import { CocktailApiService } from '../cocktail-api.service';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})

export class DrinkListComponent implements OnInit {
  drinks: Drinks = {drinks: []};
  drinksGroups: DrinkShortcut[][] = [];
  selectedDrink?: DrinkShortcut;
  constructor(private cocktailApiService: CocktailApiService) {
  }
  ngOnInit(): void {
    this.getRecipes();
  }

  // getRecipes(){
  //   this.cocktailApiService.getDrinks().subscribe(
  //     data => {
  //       this.drinks = data
  //       console.log(data);

  //       let drink: Drinks = {
  //         drinks: []
  //       };
  //       let count = 0;
  //       this.drinks.drinks.forEach(element => {
  //         // debugger;
  //         drink.drinks.push(element);
  //         count++;
  //         if(count === 3){
  //           this.drinksGroups.push(drink);
  //           count = 0;
  //           drink = {
  //             drinks: []
  //           }
  //         }
  //       });
  //       console.log(this.drinksGroups)
  //     }
  //   );
  // }


  getRecipes(){
    this.cocktailApiService.getDrinks().subscribe(
      data => {
        this.drinks = data;
        console.log(data);
        this.drinks.drinks.reverse();
        let drinkGroup: DrinkShortcut[] = [];
        let count = 0;
        this.drinks.drinks.forEach(element => {
          drinkGroup.push(element);
          count++;
          if(count === 3){
            this.drinksGroups.push(drinkGroup);
            count = 0;
            drinkGroup = [];
          }
        });
        if(drinkGroup !== []) {
          this.drinksGroups.push(drinkGroup);
        }
        console.log(this.drinksGroups)
      }
    );
  }


  onSelect(drink: DrinkShortcut): void {
    this.selectedDrink = drink;
  }

  // add(assetId: string, value: number): void {
  //   // assetId= name.trim();
  //   // if (!name) { return; }
  //   this.userAssetService.addUserAsset(assetId, value)
  //     .subscribe(asset => {
  //       this.userAssets.push(asset);
  //     });
  // }

  // delete(asset: UserAsset): void {
  //   this.userAssets = this.userAssets.filter(a => a !== asset);
  //   this.userAssetService.deleteUserAsset(asset.id).subscribe();
  // }



  // delete(asset: UserAsset): void {
  //   this.userAssets = this.userAssets.filter(a => a !== asset);
  //   // this.assetService.deleteHero(asset.id).subscribe();  // delete from sever
  // }
}

