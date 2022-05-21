import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Drink, DrinkDetails, Ingredient } from '../cocktail-api';
import { CocktailApiService } from '../cocktail-api.service';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  drink: DrinkDetails = {
    idDrink: 0,
    strDrink: "",
    strDrinkAlternate: "",
    strTags: "",
    strVideo: "",
    strCategory:  "",
    strIBA: "",
    strAlcoholic: "",
    strGlass: "",
    strInstructions: "",
    strDrinkThumb: "",
    strIngredient1: "",
    strIngredient2: "",
    strIngredient3: "",
    strIngredient4: "",
    strIngredient5: "",
    strIngredient6: "",
    strIngredient7: "",
    strIngredient8: "",
    strIngredient9: "",
    strIngredient10: "",
    strIngredient11: "",
    strIngredient12: "",
    strIngredient13: "",
    strIngredient14: "",
    strIngredient15: "",
    strMeasure1: "",
    strMeasure2: "",
    strMeasure3: "",
    strMeasure4: "",
    strMeasure5: "",
    strMeasure6: "",
    strMeasure7: "",
    strMeasure8: "",
    strMeasure9: "",
    strMeasure10: "",
    strMeasure11: "",
    strMeasure12: "",
    strMeasure13: "",
    strMeasure14 : "",
    strMeasure15 : ""
  };
  id: number = -1;
  ingredientsAndMeasures: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cocktailApiService: CocktailApiService
  ) { }

  ngOnInit(): void {
    this.getIdFromURL();
    this.getDrink();
  }

  getIdFromURL() {
    this.route.paramMap.subscribe( paramMap => {
      this.id = Number(paramMap.get('id'));
    });
  }

  getDrink(){
    this.cocktailApiService.getDrink(this.id).subscribe(
      data => {
        this.drink = data.drinks[0];
        console.log('drink', this.drink);
        let ingredient = "";
        // let attrIngredientName: string = 'strIngredient';
        // let attrMeasureName = 'strMeasure';
        // for (let i = 1; i < 16; i += 1)  {
        //   attrIngredientName.concat(i.toString());
        //   console.log('attrIngrName', attrIngredientName);
        //   ingredient = this.drink[attrIngredientName];
        //   if(ingredient !== null){
        //     this.ingredientsAndMeasures.push({
        //       name: ingredient,
        //       measure: this.drink['strMeasure1']
        //     });
        // }

        // }

        ingredient = this.drink['strIngredient1'];
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink['strMeasure1']
          });
        }
        ingredient = this.drink.strIngredient2;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure2
          });
        }
        ingredient = this.drink.strIngredient3;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure3
          });
        }
        ingredient = this.drink.strIngredient4;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure4
          });
        }
        ingredient = this.drink.strIngredient5;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure5
          });
        }
        ingredient = this.drink.strIngredient6;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure6
          });
        }
        ingredient = this.drink.strIngredient7;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure7
          });
        }
        ingredient = this.drink.strIngredient8;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure8
          });
        }
        ingredient = this.drink.strIngredient9;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure9
          });
        }
        ingredient = this.drink.strIngredient10;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure10
          });
        }
        ingredient = this.drink.strIngredient11;
        if(ingredient !== null && ingredient != "" ){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure11
          });
        }
        ingredient = this.drink.strIngredient12;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure12
          });
        }
        ingredient = this.drink.strIngredient13;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure13
          });
        }
        ingredient = this.drink.strIngredient14;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure14
          });
        }
        ingredient = this.drink.strIngredient15;
        if(ingredient !== null && ingredient != ""){
          this.ingredientsAndMeasures.push({
            name: ingredient,
            measure: this.drink.strMeasure15
          });
        }
        console.log('ingredients', this.ingredientsAndMeasures)
      }
    );
  }

}
