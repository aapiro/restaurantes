package com.example;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
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

        // Handle rating update if provided
        BigDecimal updatedRating = updatedRestaurant.getRating();
        if (updatedRating != null) {
            // Validate rating is between 0 and 5
            if (updatedRating.compareTo(BigDecimal.ZERO) < 0 || updatedRating.compareTo(new BigDecimal("5.0")) > 0) {
                throw new IllegalArgumentException("Rating must be between 0 and 5");
            }
            // Round to 1 decimal place
            existing.setRating(updatedRating.setScale(1, RoundingMode.HALF_UP));
        }

        // Update other fields if provided
        String description = updatedRestaurant.getDescription();
        if (description != null) {
            existing.setDescription(description);
        }

        Integer deliveryTimeMin = updatedRestaurant.getDeliveryTimeMin();
        if (deliveryTimeMin != null) {
            existing.setDeliveryTimeMin(deliveryTimeMin);
        }

        Integer deliveryTimeMax = updatedRestaurant.getDeliveryTimeMax();
        if (deliveryTimeMax != null) {
            existing.setDeliveryTimeMax(deliveryTimeMax);
        }

        BigDecimal deliveryFee = updatedRestaurant.getDeliveryFee();
        if (deliveryFee != null) {
            existing.setDeliveryFee(deliveryFee);
        }

        BigDecimal minimumOrder = updatedRestaurant.getMinimumOrder();
        if (minimumOrder != null) {
            existing.setMinimumOrder(minimumOrder);
        }

        Boolean isOpen = updatedRestaurant.isOpen();
        if (isOpen != null) {
            existing.setOpen(isOpen);
        }

        String imageUrl = updatedRestaurant.getImageUrl();
        if (imageUrl != null) {
            existing.setImageUrl(imageUrl);
        }

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