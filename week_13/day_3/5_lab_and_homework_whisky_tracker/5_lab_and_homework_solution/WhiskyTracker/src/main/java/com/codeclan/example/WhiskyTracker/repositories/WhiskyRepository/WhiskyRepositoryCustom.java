package com.codeclan.example.WhiskyTracker.repositories.WhiskyRepository;

import com.codeclan.example.WhiskyTracker.models.Whisky;

import java.util.List;

public interface WhiskyRepositoryCustom {

    List<Whisky> findWhiskiesByAgeAndDistilleryId(int age, Long distilleryId);

    List<Whisky> findWhiskiesByRegion(String region);
}
