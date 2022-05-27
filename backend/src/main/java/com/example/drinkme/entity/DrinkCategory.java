package com.example.drinkme.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "drinkscategories")
public class DrinkCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @NotNull(message = "Drink Id is mandatory")
    private long drinkId;

    @NotNull(message = "Category Id is mandatory")
    private long categoryId;

    public DrinkCategory() {
    }

    public DrinkCategory(long drinkId, long categoryId) {
        this.drinkId = drinkId;
        this.categoryId = categoryId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public long getDrinkId() {
        return drinkId;
    }

    public void setDrinkId(long drinkId) {
        this.drinkId = drinkId;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long drinkId) {
        this.drinkId = drinkId;
    }

    @Override
    public String toString() {
        return "DrinkCategory: " + id + "\nDrink Id: " + drinkId + "\nCategory Id: " + categoryId;
    }
    
}
