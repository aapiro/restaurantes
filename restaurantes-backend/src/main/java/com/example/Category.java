package com.example;

import io.quarkus.hibernate.orm.panache.MappingTo;
import jakarta.persistence.*;

@Entity
@Table(name = "categories")
@MappingTo(Category.class)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String name;

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
}