package com.example.drinkme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.drinkme.dto.CocktailArticleDto;
import com.example.drinkme.service.CocktailArticleService;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/articles") 
public class CocktailArticleController {
    @Autowired
    private CocktailArticleService cocktailArticleService; 

    @GetMapping("data") 
    public ResponseEntity<List<CocktailArticleDto>> getArticlesData() {
        return new ResponseEntity<List<CocktailArticleDto>>(
            cocktailArticleService.retrieveArticlesData(),HttpStatus.OK);
    }
}
