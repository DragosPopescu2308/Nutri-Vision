package com.dragos.nutrivision.repository;

import com.dragos.nutrivision.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
