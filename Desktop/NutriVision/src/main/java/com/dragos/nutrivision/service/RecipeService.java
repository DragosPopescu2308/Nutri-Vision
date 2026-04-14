package com.dragos.nutrivision.service;

import com.dragos.nutrivision.dto.RecipeIngredientRequestDto;
import com.dragos.nutrivision.dto.RecipeIngredientResponseDto;
import com.dragos.nutrivision.dto.RecipeRequestDto;
import com.dragos.nutrivision.dto.RecipeResponseDto;
import com.dragos.nutrivision.entity.Recipe;
import com.dragos.nutrivision.entity.RecipeIngredient;
import com.dragos.nutrivision.repository.FoodRepository;
import com.dragos.nutrivision.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final FoodRepository foodRepository;

    public RecipeService(RecipeRepository recipeRepository, FoodRepository foodRepository) {
        this.recipeRepository = recipeRepository;
        this.foodRepository = foodRepository;
    }

    public RecipeResponseDto createRecipe(RecipeRequestDto recipeRequestDto) {

        double totalCalories = 0;
        double totalProteins = 0;
        double totalFats = 0;
        double totalCarbs = 0;
        List<RecipeIngredient> ingredients = new ArrayList<>();

        double caloriesPer100g = 0;
        double proteinsPer100g = 0;
        double fatPer100g = 0;
        double carbsPer100g = 0;


        Recipe recipe = new Recipe();
        recipe.setName(recipeRequestDto.getName());
        recipe.setDescription(recipeRequestDto.getDescription());
        recipe.setFinalCookedWeight(recipeRequestDto.getFinalCookedWeight());

        for (var ingredient : recipeRequestDto.getIngredients()) {
            var food = foodRepository.findById(ingredient.getFoodId()).orElseThrow(() -> new RuntimeException("Food not found"));


            totalCalories = totalCalories +  (food.getCaloriesPer100g() * ingredient.getWeightInGrams() / 100);
            totalProteins = totalProteins + (food.getProteinsPer100g() * ingredient.getWeightInGrams() / 100);
            totalFats = totalFats +  (food.getFatPer100g() * ingredient.getWeightInGrams() / 100);
            totalCarbs = totalCarbs + (food.getCarbsPer100g() * ingredient.getWeightInGrams() / 100);

           RecipeIngredient recipeIngredient = new RecipeIngredient();
              recipeIngredient.setFood(food);
            recipeIngredient.setRecipe(recipe);
                recipeIngredient.setWeightInGrams(ingredient.getWeightInGrams());
                ingredients.add(recipeIngredient);

        }

            recipe.setIngredients(ingredients);




        recipe.setTotalCalories(totalCalories);
        recipe.setTotalProteins(totalProteins);
        recipe.setTotalFat(totalFats);
        recipe.setTotalCarbs(totalCarbs);

        caloriesPer100g = (totalCalories / recipe.getFinalCookedWeight()) * 100;
        proteinsPer100g = (totalProteins / recipe.getFinalCookedWeight()) * 100;
        fatPer100g = (totalFats / recipe.getFinalCookedWeight()) * 100;
        carbsPer100g = (totalCarbs / recipe.getFinalCookedWeight()) * 100;

        recipe.setCaloriesPer100g(caloriesPer100g);
        recipe.setProteinsPer100g(proteinsPer100g);
        recipe.setFatPer100g(fatPer100g);
        recipe.setCarbsPer100g(carbsPer100g);

        Recipe savedRecipe = recipeRepository.save(recipe);
        return toDto(savedRecipe);



    }

    @Transactional(readOnly = true)
    public List<RecipeResponseDto> getAllRecipes() {
        List<RecipeResponseDto> response = recipeRepository.findAll().stream()
                .map(this::toDto)
                .toList();
        return response;
    }

    @Transactional(readOnly = true)
    public RecipeResponseDto getById(Long id){
        return toDto(recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found")));
    }

    public void deleteRecipe(Long id){
        if(!recipeRepository.existsById(id)){
            throw new RuntimeException("Recipe not found");
        }
        recipeRepository.deleteById(id);
    }


    @Transactional
    public RecipeResponseDto updateRecipe(Long id, RecipeRequestDto recipeRequestDto){
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        double totalCalories = 0;
        double totalProteins = 0;
        double totalFats = 0;
        double totalCarbs = 0;
        List<RecipeIngredient> ingredients = new ArrayList<>();
        double caloriesPer100g = 0;
        double proteinsPer100g = 0;
        double fatPer100g = 0;
        double carbsPer100g = 0;


      recipe.setName(recipeRequestDto.getName());
        recipe.setDescription(recipeRequestDto.getDescription());
        recipe.setFinalCookedWeight(recipeRequestDto.getFinalCookedWeight());


        for (var ingredient : recipeRequestDto.getIngredients()) {
            var food = foodRepository.findById(ingredient.getFoodId()).orElseThrow(() -> new RuntimeException("Food not found"));


            totalCalories = totalCalories +  (food.getCaloriesPer100g() * ingredient.getWeightInGrams() / 100);
            totalProteins = totalProteins + (food.getProteinsPer100g() * ingredient.getWeightInGrams() / 100);
            totalFats = totalFats +  (food.getFatPer100g() * ingredient.getWeightInGrams() / 100);
            totalCarbs = totalCarbs + (food.getCarbsPer100g() * ingredient.getWeightInGrams() / 100);

            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setFood(food);
            recipeIngredient.setRecipe(recipe);
            recipeIngredient.setWeightInGrams(ingredient.getWeightInGrams());
            ingredients.add(recipeIngredient);

        }

        recipe.getIngredients().clear();
        recipe.getIngredients().addAll(ingredients);



        recipe.setTotalCalories(totalCalories);
        recipe.setTotalProteins(totalProteins);
        recipe.setTotalFat(totalFats);
        recipe.setTotalCarbs(totalCarbs);

        caloriesPer100g = (totalCalories / recipe.getFinalCookedWeight()) * 100;
        proteinsPer100g = (totalProteins / recipe.getFinalCookedWeight()) * 100;
        fatPer100g = (totalFats / recipe.getFinalCookedWeight()) * 100;
        carbsPer100g = (totalCarbs / recipe.getFinalCookedWeight()) * 100;

        recipe.setCaloriesPer100g(caloriesPer100g);
        recipe.setProteinsPer100g(proteinsPer100g);
        recipe.setFatPer100g(fatPer100g);
        recipe.setCarbsPer100g(carbsPer100g);

        Recipe savedRecipe = recipeRepository.save(recipe);
        return toDto(savedRecipe);

    }

    private RecipeResponseDto toDto(Recipe recipe) {
        RecipeResponseDto recipeResponseDto = new RecipeResponseDto();
        recipeResponseDto.setName(recipe.getName());
        recipeResponseDto.setDescription(recipe.getDescription());
        recipeResponseDto.setFinalCookedWeight(recipe.getFinalCookedWeight());
        recipeResponseDto.setTotalCalories(recipe.getTotalCalories());
        recipeResponseDto.setTotalProteins(recipe.getTotalProteins());
        recipeResponseDto.setTotalFat(recipe.getTotalFat());
        recipeResponseDto.setTotalCarbs(recipe.getTotalCarbs());
        recipeResponseDto.setCaloriesPer100g(recipe.getCaloriesPer100g());
        recipeResponseDto.setProteinsPer100g(recipe.getProteinsPer100g());
        recipeResponseDto.setFatPer100g(recipe.getFatPer100g());
        recipeResponseDto.setCarbsPer100g(recipe.getCarbsPer100g());
        recipeResponseDto.setId(recipe.getId());

        List<RecipeIngredientResponseDto> ingredients = new ArrayList<>();

        for (RecipeIngredient ingredient : recipe.getIngredients()) {
            RecipeIngredientResponseDto dto = new RecipeIngredientResponseDto();
            dto.setFoodId(ingredient.getFood().getId());
            dto.setFoodName(ingredient.getFood().getName());
            dto.setWeightInGrams(ingredient.getWeightInGrams());

            ingredients.add(dto);
        }

        recipeResponseDto.setIngredients(ingredients);

        return recipeResponseDto;
    }
}
