package com.example;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class DishService {

    @Inject
    DishRepository dishRepository;

    public List<Dish> getAllDishes() {
        return dishRepository.listAll();
    }

    @Transactional
    public Dish addDish(Dish dish) {
        dishRepository.persist(dish);
        return dish;
    }

    public Dish getDishById(int id) {
        return dishRepository.findById(id);
    }

    @Transactional
    public Dish updateDish(int id, Dish updatedDish) {
        Dish existingDish = dishRepository.findById(id);

        if (existingDish == null) {
            throw new NotFoundException("Dish not found");
        }

        // Update fields from the updatedDish
        existingDish.setName(updatedDish.getName());
        existingDish.setDescription(updatedDish.getDescription());
        existingDish.setPrice(updatedDish.getPrice());
        existingDish.setImageUrl(updatedDish.getImageUrl());
        existingDish.setRestaurant(updatedDish.getRestaurant());

        return existingDish;
    }

    @Transactional
    public void deleteDish(int id) {
        Dish dish = dishRepository.findById(id);

        if (dish == null) {
            throw new NotFoundException("Dish not found");
        }

        dishRepository.delete(dish);
    }
}