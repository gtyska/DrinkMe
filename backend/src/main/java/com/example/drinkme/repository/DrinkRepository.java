package com.example.drinkme.repository;

import com.example.drinkme.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DrinkRepository extends JpaRepository<Drink, Long> {
    
}
