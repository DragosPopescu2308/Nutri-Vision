package com.dragos.nutrivision.dto;


import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeIngredientRequestDto {
    @NotNull
    private Long foodId;

    @NotNull
    @Positive
    @DecimalMax("10000")
    private Double weightInGrams;

}
