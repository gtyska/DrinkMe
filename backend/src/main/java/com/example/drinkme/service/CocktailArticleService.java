package com.example.drinkme.service;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.drinkme.dto.CocktailArticleDto;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;


@Component("cocktailArticleService")
public class CocktailArticleService {
    public List<CocktailArticleDto> retrieveArticlesData() {

        List<CocktailArticleDto> cocktailArticleDto = new ArrayList<>();

        String sprappedUrl = "https://www.foodandwine.com/drinks";
        String className = "category-page-list-content";

        try {
            Document webPage = Jsoup.connect(sprappedUrl).get();
            List<Element> divRecent = webPage.getElementsByClass(className)
                .get(0).getElementsByClass("category-page-item");
        
            for (Element div : divRecent) {
                Elements divArticle = div.getElementsByClass("category-page-item-content");
                if(divArticle.isEmpty()) 
                    continue;

                Elements a = divArticle.get(0).getElementsByTag("a");
                String title = a.text();
                title = title.split(" Read More")[0];
                String url = a.attr("href");

                cocktailArticleDto.add(new CocktailArticleDto(url, title));
            }

            return cocktailArticleDto;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
