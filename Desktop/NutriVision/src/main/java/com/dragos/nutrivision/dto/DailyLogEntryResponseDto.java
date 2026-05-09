package com.dragos.nutrivision.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class DailyLogEntryResponseDto {
    private Long id;
    private LocalDate logDate;

    private String itemType;
    private String itemName;

    private Double quantityInGrams;

    private Double calories;
    private Double proteins;
    private Double fat;
    private Double carbs;
}