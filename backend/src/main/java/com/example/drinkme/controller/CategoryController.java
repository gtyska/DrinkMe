package com.example.drinkme.controller;

import java.util.Optional;
import com.example.drinkme.entity.Drink;
import com.example.drinkme.entity.Category;
import com.example.drinkme.repository.DrinkRepository;
import com.example.drinkme.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    DrinkRepository drinkRepository;

    @RequestMapping
    public ResponseEntity<Object> findCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> Insert(@RequestBody Category category){
        if (category != null) {
            List<Drink> categoryDrinks= category.getDrinks();
            if (categoryDrinks.size() > 0) {
                for (Drink drink : categoryDrinks) {
                    drinkRepository.save(drink);
                }
            }
        }
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @RequestMapping("/{id}")
    public ResponseEntity<Object> findCategoryById(@PathVariable long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateExpense(@PathVariable("id") long id, @RequestBody Category category) {
        Category foundedCategory = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category: id " + id + " is not found"));
        foundedCategory.setName(category.getName());
        foundedCategory.setDescription(category.getDescription());
        foundedCategory.setDrinks(category.getDrinks());
        final Category updatedCategory = categoryRepository.save(foundedCategory);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category != null) {
            categoryRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    
}
