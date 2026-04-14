package com.dragos.nutrivision.controller;

import com.dragos.nutrivision.dto.FoodRequestDto;
import com.dragos.nutrivision.dto.FoodResponseDto;
import com.dragos.nutrivision.service.FoodService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    private final FoodService foodService;

    public FoodController(FoodService foodService){
        this.foodService = foodService;
    }

    @PostMapping
    public ResponseEntity<FoodResponseDto> createFood(@RequestBody @Valid FoodRequestDto foodRequestDto) {
        return ResponseEntity.status(201).body(foodService.createFood(foodRequestDto));
    }

    @GetMapping
    public ResponseEntity<List<FoodResponseDto>> getAllFoods() {
        return ResponseEntity.ok(foodService.getAllFoods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodResponseDto> updateFood(@PathVariable Long id, @RequestBody @Valid FoodRequestDto foodRequestDto) {
        return ResponseEntity.ok(foodService.updateFood(id, foodRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();

    }
}
