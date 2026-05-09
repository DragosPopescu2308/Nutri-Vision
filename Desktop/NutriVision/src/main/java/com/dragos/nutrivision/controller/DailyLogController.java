package com.dragos.nutrivision.controller;

import com.dragos.nutrivision.dto.DailyLogEntryRequestDto;
import com.dragos.nutrivision.dto.DailyLogEntryResponseDto;
import com.dragos.nutrivision.dto.DailySummaryResponseDto;
import com.dragos.nutrivision.service.DailyLogService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/daily-log")
public class DailyLogController {

    private final DailyLogService dailyLogService;

    public DailyLogController(DailyLogService dailyLogService) {
        this.dailyLogService = dailyLogService;
    }

    @PostMapping
    public ResponseEntity<DailyLogEntryResponseDto> addEntry(@RequestBody DailyLogEntryRequestDto request) {
        return ResponseEntity.status(201).body(dailyLogService.addEntry(request));
    }

    @GetMapping
    public ResponseEntity<DailySummaryResponseDto> getDailySummary(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return ResponseEntity.ok(dailyLogService.getDailySummary(date));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        dailyLogService.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }
}