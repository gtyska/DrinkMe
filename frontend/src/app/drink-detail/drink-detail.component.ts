import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Drink, DrinkDetails, Ingredient } from '../cocktail-api';
import { CocktailApiService } from '../cocktail-api.service';

import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  drink: DrinkDetails | undefined;
  id: string = "";
  ingredientsAndMeasures: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cocktailApiService: CocktailApiService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.getIdFromURL();
    this.getDrink();
  }

  // /**
  // * Append the scprit tag to HTML file's body.
  // * @param renderer the Angular Renderer2
  // * @param src the path to the script
  // * @returns the script element
  // */
  //  public loadJsScript(renderer: Renderer2, src: string): HTMLScriptElement {
  //   const script = renderer.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = src;
  //   renderer.appendChild(this.document.body, script);
  //   return script;
  // }

  getIdFromURL() {
    this.route.paramMap.subscribe( paramMap => {
      const paramId = paramMap.get('id');
      if(paramId !== null) {
        this.id = paramId;
      }

    });
  }

  getDrink(){
    this.cocktailApiService.getDrink(this.id).subscribe(
      data => {
        if (data === null) {
          console.log('data is null');
          this.router.navigateByUrl('empty-glass');
        }
        else {
          this.drink = data.drinks[0];
          console.log('drink', this.drink);
          let ingredient = "";
          // const attrIngredientName = 'strIngredient';
          // const attrMeasureName = 'strMeasure1';
          // for (let i = 1; i < 16; i += 1)  {
          //   const attrName: any = attrIngredientName.concat(i.toString());
          //   console.log('attrIngrName', attrIngredientName);
          //   ingredient = this.drink[attrName];
          //   if(ingredient !== null){
          //     this.ingredientsAndMeasures.push({
          //       name: ingredient,
          //       measure: this.drink[attrMeasureName]
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
      }
    );
  }

}
