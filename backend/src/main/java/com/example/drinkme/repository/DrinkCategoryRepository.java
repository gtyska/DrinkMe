package com.example.drinkme.repository;
import java.util.List;

import com.example.drinkme.entity.DrinkCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkCategoryRepository extends JpaRepository<DrinkCategory, Long>{
    
    List<DrinkCategory> findByDrinkId(long drinkId);

    List<DrinkCategory> findByCategoryId(long categoryId);

    List<DrinkCategory> findByDrinkIdAndCategoryId(long drinkId, long categoryId);

}
