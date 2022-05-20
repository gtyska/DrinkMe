package com.example.drinkme.controller;

import java.util.List;
import java.util.Optional;

import com.example.drinkme.entity.Category;
import com.example.drinkme.entity.Drink;
import com.example.drinkme.repository.CategoryRepository;
import com.example.drinkme.repository.DrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/drinks")
public class DrinkController {
    @Autowired
    DrinkRepository drinkRepository;
    
    @Autowired
    CategoryRepository categoryRepository;


    @RequestMapping
    public ResponseEntity<Object> findDrinks() {
        return ResponseEntity.ok(drinkRepository.findAll());
    }

    @RequestMapping("/{id}")
    public ResponseEntity<Object> findDrinkById(@PathVariable long id) {
        Optional<Drink> drink = drinkRepository.findById(id);
        if (drink != null) {
            return ResponseEntity.ok(drink);
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/categoryId={categoryId}")
    public ResponseEntity<Object> findDrinksByCategoryId(@PathVariable long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category != null) {
            List<Drink> drinks = category.get().getDrinks();
            return ResponseEntity.ok(drinks);
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/categoryId={categoryId}")
    public ResponseEntity<Object> Insert(@PathVariable long categoryId, @RequestBody Drink drink){
        
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category != null) {
            List<Drink> drinks = category.get().getDrinks();
            drinks.add(drink);
            category.get().setDrinks(drinks);
            return ResponseEntity.ok(drinkRepository.save(drink));
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Drink> updateDrink(@PathVariable("id") long id, @RequestBody Drink drink) {
        Drink foundedDrink = drinkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Drink: id " + id + " is not found"));
        foundedDrink.setDrinkId(drink.getDrinkId());
        final Drink updatedDrink = drinkRepository.save(foundedDrink);
        return ResponseEntity.ok(updatedDrink);
    }

    @DeleteMapping("/{categoryId}/{drinkId}")
    public ResponseEntity<Object> delete(@PathVariable("categoryId") long categoryId, @PathVariable("drinkId") long drinkId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category != null) {
            category.get().getDrinks().removeIf(obj -> obj.getId() == drinkId);
            // drinkRepository.deleteById(drinkId);  -- dont delete drink from database, just from category
            categoryRepository.save(category.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
