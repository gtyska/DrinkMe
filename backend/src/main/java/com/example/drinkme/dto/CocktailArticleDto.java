package com.example.drinkme.dto;

public class CocktailArticleDto {
    public String url;
    public String title;

    public CocktailArticleDto(String url,String title) { 
        this.url = url;
        this.title = title;
    }

    public CocktailArticleDto() {
    }
    
}
