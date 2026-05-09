package com.dragos.nutrivision.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class DailyLogEntryRequestDto {
    private LocalDate logDate;
    private Long foodId;
    private Long recipeId;
    private Double quantityInGrams;
}