package com.example;

import io.quarkus.hibernate.orm.panache.MappingTo;
import jakarta.persistence.*;

@Entity
@Table(name = "restaurant_categories")
@MappingTo(RestaurantCategory.class)
public class RestaurantCategory {

    @EmbeddedId
    private RestaurantCategoryId id;

    public RestaurantCategory() {
        this.id = new RestaurantCategoryId();
    }

    public RestaurantCategory(int restaurantId, int categoryId) {
        this.id = new RestaurantCategoryId(restaurantId, categoryId);
    }

    public RestaurantCategoryId getId() {
        return id;
    }

    public void setId(RestaurantCategoryId id) {
        this.id = id;
    }

    @Embeddable
    public static class RestaurantCategoryId implements java.io.Serializable {

        @Column(name = "restaurant_id")
        private int restaurantId;

        @Column(name = "category_id")
        private int categoryId;

        public RestaurantCategoryId() {}

        public RestaurantCategoryId(int restaurantId, int categoryId) {
            this.restaurantId = restaurantId;
            this.categoryId = categoryId;
        }

        // Getters and setters
        public int getRestaurantId() {
            return restaurantId;
        }

        public void setRestaurantId(int restaurantId) {
            this.restaurantId = restaurantId;
        }

        public int getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(int categoryId) {
            this.categoryId = categoryId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof RestaurantCategoryId)) return false;

            RestaurantCategoryId that = (RestaurantCategoryId) o;

            if (restaurantId != that.restaurantId) return false;
            return categoryId == that.categoryId;
        }

        @Override
        public int hashCode() {
            int result = restaurantId;
            result = 31 * result + categoryId;
            return result;
        }
    }
}