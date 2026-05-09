package com.dragos.nutrivision.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class DailyLogEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate logDate;
    private Double quantityInGrams;

    private Double calories;
    private Double proteins;
    private Double fat;
    private Double carbs;

    private String itemType;
    private String itemName;


    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;



    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}