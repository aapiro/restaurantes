package com.example;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/dishes")
public class DishResource {

    @Inject
    DishService dishService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Dish> getAllDishes() {
        return dishService.getAllDishes();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Dish addDish(Dish dish) {
        return dishService.addDish(dish);
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Dish getDishById(@PathParam("id") int id) {
        return dishService.getDishById(id);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Dish updateDish(@PathParam("id") int id, Dish updatedDish) {
        return dishService.updateDish(id, updatedDish);
    }

    @DELETE
    @Path("/{id}")
    public void deleteDish(@PathParam("id") int id) {
        dishService.deleteDish(id);
    }
}