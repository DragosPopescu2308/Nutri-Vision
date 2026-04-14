package com.dragos.nutrivision.repository;

import com.dragos.nutrivision.dto.FoodResponseDto;
import com.dragos.nutrivision.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {

}
