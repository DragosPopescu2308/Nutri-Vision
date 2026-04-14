package com.dragos.nutrivision.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FoodResponseDto {
   private Long id;
    private String name;
    private String brand;
    private Double caloriesPer100g;
    private Double proteinsPer100g;
    private Double fatPer100g;
    private Double carbsPer100g;
}
