package com.dragos.nutrivision.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FoodRequestDto {
    @NotBlank(message = "Name cannot be empty!")
    @Size(max = 100)
    private String name;

    private String brand;

    @NotNull
    @Positive
    private Double caloriesPer100g;

    @NotNull
    @PositiveOrZero
    @DecimalMax("100")
    private Double proteinsPer100g;

    @NotNull
    @PositiveOrZero
    @DecimalMax("100")
    private Double fatPer100g;

    @NotNull
    @PositiveOrZero
    @DecimalMax("100")
    private Double carbsPer100g;
}
