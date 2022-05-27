package com.example.drinkme.controller;

import java.util.Optional;
import com.example.drinkme.entity.DrinkCategory;
import com.example.drinkme.entity.Category;
import com.example.drinkme.repository.DrinkRepository;
import com.example.drinkme.repository.CategoryRepository;
import com.example.drinkme.repository.DrinkCategoryRepository;

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

    @Autowired
    DrinkCategoryRepository drinkCategoryRepository;

    // gets all categories
    @RequestMapping
    public ResponseEntity<Object> findCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    // creates new category
    @PostMapping
    public ResponseEntity<Object> Insert(@RequestBody Category category){
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    // gets category by id
    @RequestMapping("/{id}")
    public ResponseEntity<Object> findCategoryById(@PathVariable long id) {
        // System.out.println("request for id");
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // change categorie's data
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") long id, @RequestBody Category category) {
        // System.out.println("put for id");
        Category foundedCategory = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category: id " + id + " is not found"));
        foundedCategory.setName(category.getName());
        foundedCategory.setDescription(category.getDescription());
        final Category updatedCategory = categoryRepository.save(foundedCategory);
        return ResponseEntity.ok(updatedCategory);
    }

    // delete specific category
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category != null) {
            categoryRepository.deleteById(id);

            drinkRepository.deleteById(id);
            // delete all DrinkCategory connected with deleted category
            List<DrinkCategory> drinkCategoryList = drinkCategoryRepository.findByCategoryId(id);
            for(DrinkCategory drinkCategory : drinkCategoryList){
                drinkCategoryRepository.deleteById(drinkCategory.getId());
            }
            return ResponseEntity.status(HttpStatus.OK).body(null);
            
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
