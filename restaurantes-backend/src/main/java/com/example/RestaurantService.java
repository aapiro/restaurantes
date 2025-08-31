package com.example;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class RestaurantService {

    @Inject
    RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.listAll();
    }

    @Transactional
    public Restaurant addRestaurant(Restaurant restaurant) {
        restaurantRepository.persist(restaurant);
        return restaurant;
    }

    public Restaurant getRestaurantById(int id) {
        return restaurantRepository.findById(id);
    }

    @Transactional
    public Restaurant updateRestaurant(int id, Restaurant updatedRestaurant) {
        Restaurant existing = restaurantRepository.findById(id);
        if (existing == null) {
            throw new NotFoundException("Restaurant with ID " + id + " not found");
        }

        // Update fields
        existing.setName(updatedRestaurant.getName());
        existing.setCuisine(updatedRestaurant.getCuisine());

        return existing;
    }

    @Transactional
    public void deleteRestaurant(int id) {
        Restaurant restaurant = restaurantRepository.findById(id);
        if (restaurant != null) {
            restaurantRepository.delete(restaurant);
        } else {
            throw new NotFoundException("Restaurant with ID " + id + " not found");
        }
    }
}