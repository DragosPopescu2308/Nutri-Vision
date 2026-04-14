package com.dragos.nutrivision.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RecipeRequestDto {

    @NotBlank(message = "Name cannot be empty!")
    private String name;


    private String description;

    @NotNull(message = "Final cooked weight cannot be null!")
    @Positive
    @DecimalMax("10000")
    private Double finalCookedWeight;

    @NotNull(message = "Ingredients cannot be null!")
    @Size(min = 1, message = "At least one ingredient is required!")
    @Valid
    private List<RecipeIngredientRequestDto> ingredients;


}
