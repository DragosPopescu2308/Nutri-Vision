package com.dragos.nutrivision.service;

import com.dragos.nutrivision.dto.DailyLogEntryRequestDto;
import com.dragos.nutrivision.dto.DailyLogEntryResponseDto;
import com.dragos.nutrivision.dto.DailySummaryResponseDto;
import com.dragos.nutrivision.entity.DailyLogEntry;
import com.dragos.nutrivision.entity.Food;
import com.dragos.nutrivision.entity.Recipe;
import com.dragos.nutrivision.entity.User;
import com.dragos.nutrivision.repository.DailyLogEntryRepository;
import com.dragos.nutrivision.repository.FoodRepository;
import com.dragos.nutrivision.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailyLogService {

    private final DailyLogEntryRepository dailyLogEntryRepository;
    private final FoodRepository foodRepository;
    private final RecipeRepository recipeRepository;
    private final CurrentUserService currentUserService;

    public DailyLogService(DailyLogEntryRepository dailyLogEntryRepository,
                           FoodRepository foodRepository,
                           RecipeRepository recipeRepository,
                           CurrentUserService currentUserService) {
        this.dailyLogEntryRepository = dailyLogEntryRepository;
        this.foodRepository = foodRepository;
        this.recipeRepository = recipeRepository;
        this.currentUserService = currentUserService;
    }

    public DailyLogEntryResponseDto addEntry(DailyLogEntryRequestDto dto) {
        User user = currentUserService.getCurrentUser();

        if (dto.getFoodId() == null && dto.getRecipeId() == null) {
            throw new RuntimeException("You must select a food or a recipe");
        }

        if (dto.getFoodId() != null && dto.getRecipeId() != null) {
            throw new RuntimeException("You cannot select both food and recipe");
        }

        if (dto.getQuantityInGrams() == null || dto.getQuantityInGrams() <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        double quantity = dto.getQuantityInGrams();
        double factor = quantity / 100.0;

        DailyLogEntry entry = new DailyLogEntry();
        entry.setUser(user);
        entry.setLogDate(dto.getLogDate() != null ? dto.getLogDate() : LocalDate.now());
        entry.setQuantityInGrams(quantity);

        if (dto.getFoodId() != null) {
            Food food = foodRepository.findByIdAndUser(dto.getFoodId(), user)
                    .orElseThrow(() -> new RuntimeException("Food not found"));

            entry.setFood(food);
            entry.setItemType("FOOD");
            entry.setItemName(food.getName());

            entry.setCalories(food.getCaloriesPer100g() * factor);
            entry.setProteins(food.getProteinsPer100g() * factor);
            entry.setFat(food.getFatPer100g() * factor);
            entry.setCarbs(food.getCarbsPer100g() * factor);
        } else {
            Recipe recipe = recipeRepository.findByIdAndUser(dto.getRecipeId(), user)
                    .orElseThrow(() -> new RuntimeException("Recipe not found"));

            entry.setRecipe(recipe);
            entry.setItemType("RECIPE");
            entry.setItemName(recipe.getName());

            entry.setCalories(recipe.getCaloriesPer100g() * factor);
            entry.setProteins(recipe.getProteinsPer100g() * factor);
            entry.setFat(recipe.getFatPer100g() * factor);
            entry.setCarbs(recipe.getCarbsPer100g() * factor);
        }

        DailyLogEntry savedEntry = dailyLogEntryRepository.save(entry);
        return toDto(savedEntry);
    }

    public DailySummaryResponseDto getDailySummary(LocalDate date) {
        User user = currentUserService.getCurrentUser();

        LocalDate targetDate = date != null ? date : LocalDate.now();

        List<DailyLogEntry> entries =
                dailyLogEntryRepository.findAllByUserAndLogDate(user, targetDate);

        List<DailyLogEntryResponseDto> entryDtos = entries.stream()
                .map(this::toDto)
                .toList();

        double totalCalories = entries.stream()
                .mapToDouble(entry -> entry.getCalories() != null ? entry.getCalories() : 0)
                .sum();

        double totalProteins = entries.stream()
                .mapToDouble(entry -> entry.getProteins() != null ? entry.getProteins() : 0)
                .sum();

        double totalFat = entries.stream()
                .mapToDouble(entry -> entry.getFat() != null ? entry.getFat() : 0)
                .sum();

        double totalCarbs = entries.stream()
                .mapToDouble(entry -> entry.getCarbs() != null ? entry.getCarbs() : 0)
                .sum();

        DailySummaryResponseDto response = new DailySummaryResponseDto();
        response.setDate(targetDate);
        response.setTotalCalories(totalCalories);
        response.setTotalProteins(totalProteins);
        response.setTotalFat(totalFat);
        response.setTotalCarbs(totalCarbs);
        response.setEntries(entryDtos);

        return response;
    }

    public void deleteEntry(Long id) {
        User user = currentUserService.getCurrentUser();

        DailyLogEntry entry = dailyLogEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        dailyLogEntryRepository.delete(entry);
    }

    private DailyLogEntryResponseDto toDto(DailyLogEntry entry) {
        DailyLogEntryResponseDto dto = new DailyLogEntryResponseDto();

        dto.setId(entry.getId());
        dto.setLogDate(entry.getLogDate());
        dto.setItemType(entry.getItemType());
        dto.setItemName(entry.getItemName());
        dto.setQuantityInGrams(entry.getQuantityInGrams());
        dto.setCalories(entry.getCalories());
        dto.setProteins(entry.getProteins());
        dto.setFat(entry.getFat());
        dto.setCarbs(entry.getCarbs());

        return dto;
    }
}