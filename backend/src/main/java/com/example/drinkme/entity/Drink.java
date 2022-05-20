package com.example.drinkme.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "drinks")
public class Drink {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull(message = "Drink Id is mandatory")
    private long drinkId;

    public Drink() {
    }

    public Drink(long drinkId) {
        this.drinkId = drinkId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public long getDrinkId() {
        return id;
    }

    public void setDrinkId(long drinkId) {
        this.drinkId = drinkId;
    }

    @Override
    public String toString() {
        return "Drink: " + id + "\nDrink Id: " + drinkId;
    }
}
