package com.example;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/restaurants")
public class RestaurantResource {

    private static List<Restaurant> restaurants = new ArrayList<>();

    // Initialize with some sample data
    public RestaurantResource() {
        if (restaurants.isEmpty()) {
            restaurants.add(new Restaurant(1, "La Tagliatella", "Italian"));
            restaurants.add(new Restaurant(2, "El Rincon de Juan", "Spanish"));
            restaurants.add(new Restaurant(3, "Sushi Time", "Japanese"));
        }
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getAllRestaurants() {
        return "Hello from Quarkus REST";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurant addRestaurant(Restaurant restaurant) {
        restaurant.setId(restaurants.size() + 1);
        restaurants.add(restaurant);
        return restaurant;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurant getRestaurantById(@PathParam("id") int id) {
        for (Restaurant restaurant : restaurants) {
            if (restaurant.getId() == id) {
                return restaurant;
            }
        }
        throw new NotFoundException("Restaurant with ID " + id + " not found");
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurant updateRestaurant(@PathParam("id") int id, Restaurant updatedRestaurant) {
        for (int i = 0; i < restaurants.size(); i++) {
            if (restaurants.get(i).getId() == id) {
                updatedRestaurant.setId(id);
                restaurants.set(i, updatedRestaurant);
                return updatedRestaurant;
            }
        }
        throw new NotFoundException("Restaurant with ID " + id + " not found");
    }

    @DELETE
    @Path("/{id}")
    public void deleteRestaurant(@PathParam("id") int id) {
        for (int i = 0; i < restaurants.size(); i++) {
            if (restaurants.get(i).getId() == id) {
                restaurants.remove(i);
                return;
            }
        }
        throw new NotFoundException("Restaurant with ID " + id + " not found");
    }

    public static class Restaurant {
        private int id;
        private String name;
        private String cuisine;

        // Default constructor for JSON deserialization
        public Restaurant() {}

        public Restaurant(int id, String name, String cuisine) {
            this.id = id;
            this.name = name;
            this.cuisine = cuisine;
        }

        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCuisine() { return cuisine; }
        public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    }
}
