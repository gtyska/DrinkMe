package com.example.drinkme.repository;

import java.util.List;

import com.example.drinkme.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkRepository extends JpaRepository<Drink, Long> {
    List<Drink> findByCocktailId(String cocktailId);
}
