import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CocktailDetails, Ingredient } from '../cocktail-api';
import { CocktailApiService } from '../cocktail-api.service';
import { Drink } from '../drinkme'

import {RED, WHITE} from '../../icon-color';

import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


import { NgModule } from "@angular/core";
import { DrinkmeService } from '../drinkme.service';



@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  drinkDetails: CocktailDetails | undefined;
  drink: Drink | undefined;
  id: string = "";
  ingredientsAndMeasures: Ingredient[] = [];
  isDrinkFavourite = false;
  iconColor = WHITE;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cocktailApiService: CocktailApiService,
    private drinkmeService: DrinkmeService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.getIdFromURL();
    this.getDrinkExternal();
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
    this.drinkmeService.getDrink(this.id).subscribe(
      data => {
        this.drink = data;
        console.log(data);
        if(this.drink != undefined) {
          this.iconColor = RED;
        }
      }
    );
    console.log('drinkme drink', this.drink);
  }

  changeFavouriteState() {
    if(this.drink == undefined) {
      let drink = {
        id: null,
        cocktailId: this.id,
        rating: 0
      }
      this.drinkmeService.createDrink(drink).subscribe(
        data => {
          this.drink = data;
          console.log(data);
          if(this.drink != undefined) {  // got data correctly
            this.iconColor = RED;
          }
        }
      )
    }
    else {
      if (this.drink.id != null) {
        console.log('drinkId', this.drink.id);
        console.log('drink to delete', this.drink);
        let status = "";

        this.drinkmeService.deleteDrink(this.drink.id).subscribe({
          next: data => {
            this.drink = undefined;
            this.iconColor = WHITE;

          }
        });


      }
    }
  }


  getDrinkExternal(){
    this.cocktailApiService.getCocktail(this.id).subscribe(
      data => {
        if (data === null) {
          console.log('data is null');
          this.router.navigateByUrl('empty-glass');
        }
        else {
          this.drinkDetails = data.drinks[0];
          console.log('drink', this.drinkDetails);
          let ingredient = "";

          ingredient = this.drinkDetails['strIngredient1'];
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails['strMeasure1']
            });
          }
          ingredient = this.drinkDetails.strIngredient2;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure2
            });
          }
          ingredient = this.drinkDetails.strIngredient3;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure3
            });
          }
          ingredient = this.drinkDetails.strIngredient4;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure4
            });
          }
          ingredient = this.drinkDetails.strIngredient5;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure5
            });
          }
          ingredient = this.drinkDetails.strIngredient6;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure6
            });
          }
          ingredient = this.drinkDetails.strIngredient7;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure7
            });
          }
          ingredient = this.drinkDetails.strIngredient8;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure8
            });
          }
          ingredient = this.drinkDetails.strIngredient9;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure9
            });
          }
          ingredient = this.drinkDetails.strIngredient10;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure10
            });
          }
          ingredient = this.drinkDetails.strIngredient11;
          if(ingredient !== null && ingredient != "" ){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure11
            });
          }
          ingredient = this.drinkDetails.strIngredient12;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure12
            });
          }
          ingredient = this.drinkDetails.strIngredient13;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure13
            });
          }
          ingredient = this.drinkDetails.strIngredient14;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure14
            });
          }
          ingredient = this.drinkDetails.strIngredient15;
          if(ingredient !== null && ingredient != ""){
            this.ingredientsAndMeasures.push({
              name: ingredient,
              measure: this.drinkDetails.strMeasure15
            });
          }
          console.log('ingredients', this.ingredientsAndMeasures)
        }
      }
    );
  }

}
