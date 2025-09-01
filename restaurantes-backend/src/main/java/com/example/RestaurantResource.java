package com.example;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/restaurants")
public class RestaurantResource {

    @Inject
    RestaurantService restaurantService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantService.addRestaurant(restaurant);
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurant getRestaurantById(@PathParam("id") int id) {
        return restaurantService.getRestaurantById(id);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Restaurant updateRestaurant(@PathParam("id") int id, Restaurant updatedRestaurant) {
        return restaurantService.updateRestaurant(id, updatedRestaurant);
    }

    @DELETE
    @Path("/{id}")
    public void deleteRestaurant(@PathParam("id") int id) {
        restaurantService.deleteRestaurant(id);
    }
}
