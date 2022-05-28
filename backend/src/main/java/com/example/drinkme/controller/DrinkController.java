package com.example.drinkme.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.drinkme.entity.Category;
import com.example.drinkme.entity.Drink;
import com.example.drinkme.entity.DrinkCategory;
import com.example.drinkme.repository.CategoryRepository;
import com.example.drinkme.repository.DrinkRepository;
import com.example.drinkme.repository.DrinkCategoryRepository;
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

    @Autowired
    DrinkCategoryRepository drinkCategoryRepository;

    // gets all drinks
    @RequestMapping
    public ResponseEntity<Object> findDrinks() {
        return ResponseEntity.ok(drinkRepository.findAll());
    }

    // gets drink object
    @RequestMapping("/{id}")
    public ResponseEntity<Object> findDrinkById(@PathVariable long id) {
        Optional<Drink> drink = drinkRepository.findById(id);
        if (drink.isPresent()) {
            return ResponseEntity.ok(drink);
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // gets drink object
    @RequestMapping("/cocktailId={cocktailId}")
    public ResponseEntity<Object> findDrinkByCocktailId(@PathVariable String cocktailId) {
        List<Drink> drinkList = drinkRepository.findByCocktailId(cocktailId);
        if (drinkList.size() > 0) {
            Drink drink = drinkList.get(0);
            return ResponseEntity.ok(drink);
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // gets drinks form category
    @GetMapping("/categoryId={categoryId}")
    public ResponseEntity<Object> findDrinksByCategoryId(@PathVariable long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            List<DrinkCategory> drinkCategoryList = drinkCategoryRepository.findByCategoryId(categoryId);
            List<Drink> drinks = new ArrayList<Drink>();
            if(drinkCategoryList.size() > 0) {
                for(DrinkCategory drinkCategory : drinkCategoryList){
                    System.out.println("znalazłem takie categoryID");
                    long drinkId = drinkCategory.getDrinkId();
                    System.out.println(drinkId);
                    Optional<Drink> drink = drinkRepository.findById(drinkId);
                    if(drink.isPresent()){
                        System.out.println("Is present");
                        drinks.add(drink.get());
                        System.out.println(drink);
                    }
                }
            }
            return ResponseEntity.ok(drinks);
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // create drink object
    @PostMapping()
    public ResponseEntity<Object> Insert(@RequestBody Drink drink){
        return ResponseEntity.ok(drinkRepository.save(drink));
    }

    // puts drinks to category
    @PostMapping("/categoryId={categoryId}")
    public ResponseEntity<Object> Insert(@PathVariable long categoryId, @RequestBody List<Long> drinkIdList){
        Optional<Category> category = categoryRepository.findById(categoryId);
        int numberOfRowsCreated = 0;
        if (category.isPresent()) {
            for(long drinkId: drinkIdList){
                Optional<Drink> drink = drinkRepository.findById(drinkId);
                if(drink.isPresent()) {
                    List<DrinkCategory> drinkCategoryList = drinkCategoryRepository.findByDrinkIdAndCategoryId(drinkId, categoryId);
                    if (drinkCategoryList.size()==0){
                        DrinkCategory drinkCategory = new DrinkCategory(drinkId, categoryId);
                        drinkCategoryRepository.save(drinkCategory);
                        numberOfRowsCreated += 1;
                    }  
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body(numberOfRowsCreated);
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // updates only cocktailId or rating
    @PatchMapping("/{id}")
    public ResponseEntity<Drink> updateDrink(@PathVariable("id") long id, @RequestBody Drink drink) {
        Drink foundedDrink = drinkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Drink: id " + id + " is not found"));
        foundedDrink.setCocktailId(drink.getCocktailId());
        foundedDrink.setRating(drink.getRating());
        final Drink updatedDrink = drinkRepository.save(foundedDrink);
        return ResponseEntity.ok(updatedDrink);
    }

    // deletes drink
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") long id) {
        Optional<Drink> drink = drinkRepository.findById(id);
        if (drink.isPresent()) {
            drinkRepository.deleteById(id);
            // delete all DrinkCategory connected with deleted drink
            List<DrinkCategory> drinkCategoryList = drinkCategoryRepository.findByDrinkId(id);
            for(DrinkCategory drinkCategory : drinkCategoryList){
                drinkCategoryRepository.deleteById(drinkCategory.getId());
            }
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // deletes drink
    @DeleteMapping("/cocktailId={cocktailId}")
    public ResponseEntity<Object> deleteByCocktailId(@PathVariable("cocktailId") String cocktailId) {
        List<Drink> drinkList = drinkRepository.findByCocktailId(cocktailId);
        if (drinkList.size() > 0) {
            Drink drinkToDelete = drinkList.get(0); // list can have max 1 element (cocktailId is unique)
            Long drinkId = drinkToDelete.getId();
            drinkRepository.deleteById(drinkId);
            // delete all DrinkCategory connected with deleted drink
            List<DrinkCategory> drinkCategoryList = drinkCategoryRepository.findByDrinkId(drinkId);
            for(DrinkCategory drinkCategory : drinkCategoryList){
                drinkCategoryRepository.deleteById(drinkCategory.getId());
            }
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
