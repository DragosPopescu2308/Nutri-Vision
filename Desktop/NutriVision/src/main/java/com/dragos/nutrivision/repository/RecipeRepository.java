package com.dragos.nutrivision.repository;

import com.dragos.nutrivision.entity.Recipe;
import com.dragos.nutrivision.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    public Optional<Recipe> findByIdAndUser(Long id, User user);
    public List<Recipe> findAllByUser(User user);
}
