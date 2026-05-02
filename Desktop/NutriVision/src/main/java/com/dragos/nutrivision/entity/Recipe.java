package com.dragos.nutrivision.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;



    private Double finalCookedWeight;


    private Double totalCalories;


    private Double totalProteins;


    private Double totalFat;


    private Double totalCarbs;


    private Double caloriesPer100g;


    private Double proteinsPer100g;


    private Double fatPer100g;


    private Double carbsPer100g;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeIngredient> ingredients;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
