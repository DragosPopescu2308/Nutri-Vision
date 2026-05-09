package com.dragos.nutrivision.repository;

import com.dragos.nutrivision.entity.DailyLogEntry;
import com.dragos.nutrivision.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyLogEntryRepository extends JpaRepository<DailyLogEntry, Long> {

    List<DailyLogEntry> findAllByUserAndLogDate(User user, LocalDate logDate);

    List<DailyLogEntry> findAllByUserOrderByLogDateDesc(User user);
}