package com.example;

import io.quarkus.hibernate.orm.panache.MappingTo;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Entity
@Table(name = "restaurants")
@MappingTo(Restaurant.class)
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(name = "cuisine_type")
    private String cuisine;

    @Column(precision = 3, scale = 1)
    private BigDecimal rating;

    @Column(name = "review_count")
    private int reviewCount;

    @Column(name = "delivery_time_min")
    private Integer deliveryTimeMin;

    @Column(name = "delivery_time_max")
    private Integer deliveryTimeMax;

    @Column(name = "delivery_fee", precision = 5, scale = 2)
    private BigDecimal deliveryFee;

    @Column(name = "minimum_order", precision = 6, scale = 2)
    private BigDecimal minimumOrder;

    @Column(name = "is_open")
    private boolean isOpen;

    @Column(name = "image_url")
    private String imageUrl;

    // Relationships
    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    private List<Dish> dishes;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        if (rating != null) {
            // Validate rating is between 0 and 5
            if (rating.compareTo(BigDecimal.ZERO) < 0 || rating.compareTo(new BigDecimal("5.0")) > 0) {
                throw new IllegalArgumentException("Rating must be between 0 and 5");
            }
            // Round to 1 decimal place
            this.rating = rating.setScale(1, RoundingMode.HALF_UP);
        } else {
            this.rating = null;
        }
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Integer getDeliveryTimeMin() {
        return deliveryTimeMin;
    }

    public void setDeliveryTimeMin(Integer deliveryTimeMin) {
        this.deliveryTimeMin = deliveryTimeMin;
    }

    public Integer getDeliveryTimeMax() {
        return deliveryTimeMax;
    }

    public void setDeliveryTimeMax(Integer deliveryTimeMax) {
        this.deliveryTimeMax = deliveryTimeMax;
    }

    public BigDecimal getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(BigDecimal deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public BigDecimal getMinimumOrder() {
        return minimumOrder;
    }

    public void setMinimumOrder(BigDecimal minimumOrder) {
        this.minimumOrder = minimumOrder;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}