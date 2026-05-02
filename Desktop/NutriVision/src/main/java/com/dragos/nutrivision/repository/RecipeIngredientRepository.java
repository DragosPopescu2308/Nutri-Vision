package com.dragos.nutrivision.repository;

import com.dragos.nutrivision.entity.Food;
import com.dragos.nutrivision.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    boolean existsByFood(Food food);
}
