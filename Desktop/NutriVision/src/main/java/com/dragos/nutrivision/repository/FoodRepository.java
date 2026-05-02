package com.dragos.nutrivision.repository;

import com.dragos.nutrivision.dto.FoodResponseDto;
import com.dragos.nutrivision.entity.Food;
import com.dragos.nutrivision.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    Optional<Food> findByIdAndUser(Long id, User user);
    List<Food> findAllByUser(User user);
}
