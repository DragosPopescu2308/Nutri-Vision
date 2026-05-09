package com.dragos.nutrivision.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DailySummaryResponseDto {
    private LocalDate date;

    private Double totalCalories;
    private Double totalProteins;
    private Double totalFat;
    private Double totalCarbs;

    private List<DailyLogEntryResponseDto> entries;
}