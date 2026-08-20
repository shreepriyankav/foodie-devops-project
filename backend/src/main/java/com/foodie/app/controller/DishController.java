package com.foodie.app.controller;

import com.foodie.app.model.Dish;
import com.foodie.app.repository.DishRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DishController {

    private final DishRepository repo;

    public DishController(DishRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/dishes")
    public List<Dish> getAllDishes() {
        return repo.findAll();
    }

    @GetMapping("/dishes/{id}")
    public Optional<Dish> getDish(@PathVariable Long id) {
        return repo.findById(id);
    }

    @PostMapping("/dishes")
    public Dish addDish(@RequestBody Dish dish) {
        return repo.save(dish);
    }

    @DeleteMapping("/dishes/{id}")
    public void deleteDish(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/health")
    public String health() {
        return "Foodie backend is running!";
    }
}
