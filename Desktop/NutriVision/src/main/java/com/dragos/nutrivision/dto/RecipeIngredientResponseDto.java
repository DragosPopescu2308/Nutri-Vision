package com.dragos.nutrivision.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeIngredientResponseDto {
    private Long foodId;
    private String foodName;
    private Double weightInGrams;
}
