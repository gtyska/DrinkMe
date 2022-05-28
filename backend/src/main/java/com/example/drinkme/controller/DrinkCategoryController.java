package com.example.drinkme.controller;

import java.util.Optional;
import com.example.drinkme.entity.DrinkCategory;
import com.example.drinkme.repository.DrinkRepository;
import com.example.drinkme.repository.CategoryRepository;
import com.example.drinkme.repository.DrinkCategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/drinkscategories")
public class DrinkCategoryController {
    @Autowired
    DrinkRepository drinkRepository;
    
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    DrinkCategoryRepository drinkCategoryRepository;

    // gets all drinkcategories
    @RequestMapping
    public ResponseEntity<Object> findDrinks() {
        return ResponseEntity.ok(drinkCategoryRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") long id) {
        Optional<DrinkCategory> drinkCategory = drinkCategoryRepository.findById(id);
        if (drinkCategory.isPresent()) {
            drinkCategoryRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
