package com.dragos.nutrivision.dto;

import com.dragos.nutrivision.entity.RecipeIngredient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RecipeResponseDto {
    private Long id;
    private String name;
    private Double totalCalories;
    private Double totalProteins;
    private Double totalFat;
    private Double totalCarbs;
    private Double caloriesPer100g;
    private Double proteinsPer100g;
    private Double fatPer100g;
    private Double carbsPer100g;
    private String description;
    private Double finalCookedWeight;
    private List<RecipeIngredientResponseDto> ingredients;
}
