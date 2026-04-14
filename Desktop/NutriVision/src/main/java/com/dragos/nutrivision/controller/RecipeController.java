package com.dragos.nutrivision.controller;

import com.dragos.nutrivision.dto.RecipeRequestDto;
import com.dragos.nutrivision.dto.RecipeResponseDto;
import com.dragos.nutrivision.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public ResponseEntity<RecipeResponseDto> createRecipe(@RequestBody @Valid RecipeRequestDto recipeRequestDto) {
        return ResponseEntity.status(201).body(recipeService.createRecipe(recipeRequestDto));
    }

    @GetMapping
    public ResponseEntity<List<RecipeResponseDto>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> updateRecipe(@PathVariable Long id, @RequestBody @Valid RecipeRequestDto recipeRequestDto) {
        return ResponseEntity.ok(recipeService.updateRecipe(id, recipeRequestDto));
    }
}