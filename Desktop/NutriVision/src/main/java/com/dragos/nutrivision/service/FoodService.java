package com.dragos.nutrivision.service;

import com.dragos.nutrivision.dto.FoodRequestDto;
import com.dragos.nutrivision.dto.FoodResponseDto;
import com.dragos.nutrivision.entity.Food;
import com.dragos.nutrivision.entity.User;
import com.dragos.nutrivision.repository.FoodRepository;
import com.dragos.nutrivision.repository.RecipeIngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodRepository foodRepository;
    private final CurrentUserService currentUserService;
    private final RecipeIngredientRepository recipeIngredientRepository;

    public FoodService(FoodRepository foodRepository, CurrentUserService currentUserService, RecipeIngredientRepository recipeIngredientRepository) {
        this.foodRepository = foodRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.currentUserService = currentUserService;
    }

    public FoodResponseDto createFood(FoodRequestDto foodRequestDto) {


        User currentUser = currentUserService.getCurrentUser();

        Food food = new Food();
        food.setName(foodRequestDto.getName());
        food.setBrand(foodRequestDto.getBrand());
        food.setCaloriesPer100g(foodRequestDto.getCaloriesPer100g());
        food.setProteinsPer100g(foodRequestDto.getProteinsPer100g());
        food.setFatPer100g(foodRequestDto.getFatPer100g());
        food.setCarbsPer100g(foodRequestDto.getCarbsPer100g());
        food.setUser(currentUser);

        Food savedFood = foodRepository.save(food);
        return toDto(savedFood);


    }

    public List<FoodResponseDto> getAllFoods() {

        User currentUser = currentUserService.getCurrentUser();

        List<FoodResponseDto> response = foodRepository.findAllByUser(currentUser).stream()
                .map(this::toDto)
                .toList();
        return response;
    }

    public FoodResponseDto getById(Long id){
        User current = currentUserService.getCurrentUser();
        return toDto(foodRepository.findByIdAndUser(id, current).orElseThrow(() -> new RuntimeException("Food not found")));
    }

    public FoodResponseDto updateFood(Long id, FoodRequestDto foodRequestDto){
        User currentUser = currentUserService.getCurrentUser();



        Food food = foodRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        if (recipeIngredientRepository.existsByFood(food)) {
            throw new RuntimeException("Cannot update food because it is used in recipes");
        }

        food.setName(foodRequestDto.getName());
        food.setBrand(foodRequestDto.getBrand());
        food.setCaloriesPer100g(foodRequestDto.getCaloriesPer100g());
        food.setProteinsPer100g(foodRequestDto.getProteinsPer100g());
        food.setFatPer100g(foodRequestDto.getFatPer100g());
        food.setCarbsPer100g(foodRequestDto.getCarbsPer100g());

        return toDto(foodRepository.save(food));
    }

    public void deleteFood(Long id){

        User currentUser = currentUserService.getCurrentUser();

        Food food = foodRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        if (recipeIngredientRepository.existsByFood(food)) {
            throw new RuntimeException("Cannot delete food because it is used in recipes");
        }

        foodRepository.delete(food);
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
