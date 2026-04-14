package com.dragos.nutrivision.service;

import com.dragos.nutrivision.dto.FoodRequestDto;
import com.dragos.nutrivision.dto.FoodResponseDto;
import com.dragos.nutrivision.entity.Food;
import com.dragos.nutrivision.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository){
        this.foodRepository = foodRepository;
    }

    public FoodResponseDto createFood(FoodRequestDto foodRequestDto) {


        Food food = new Food();
        food.setName(foodRequestDto.getName());
        food.setBrand(foodRequestDto.getBrand());
        food.setCaloriesPer100g(foodRequestDto.getCaloriesPer100g());
        food.setProteinsPer100g(foodRequestDto.getProteinsPer100g());
        food.setFatPer100g(foodRequestDto.getFatPer100g());
        food.setCarbsPer100g(foodRequestDto.getCarbsPer100g());

        Food savedFood = foodRepository.save(food);
        return toDto(savedFood);


    }

    public List<FoodResponseDto> getAllFoods() {
        List<FoodResponseDto> response = foodRepository.findAll().stream()
                .map(this::toDto)
                .toList();
        return response;
    }

    public FoodResponseDto getById(Long id){
        return toDto(foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found")));
    }

    public FoodResponseDto updateFood(Long id, FoodRequestDto foodRequestDto){
        Food food = foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found"));

        food.setName(foodRequestDto.getName());
        food.setBrand(foodRequestDto.getBrand());
        food.setCaloriesPer100g(foodRequestDto.getCaloriesPer100g());
        food.setProteinsPer100g(foodRequestDto.getProteinsPer100g());
        food.setFatPer100g(foodRequestDto.getFatPer100g());
        food.setCarbsPer100g(foodRequestDto.getCarbsPer100g());

        return toDto(foodRepository.save(food));
    }

    public void deleteFood(Long id){
        foodRepository.deleteById(id);
    }


    private FoodResponseDto toDto(Food food){
        FoodResponseDto foodResponseDto = new FoodResponseDto();

        foodResponseDto.setId(food.getId());
        foodResponseDto.setName(food.getName());
        foodResponseDto.setBrand(food.getBrand());
        foodResponseDto.setCaloriesPer100g(food.getCaloriesPer100g());
        foodResponseDto.setProteinsPer100g(food.getProteinsPer100g());
        foodResponseDto.setFatPer100g(food.getFatPer100g());
        foodResponseDto.setCarbsPer100g(food.getCarbsPer100g());

        return foodResponseDto;
    }
}
