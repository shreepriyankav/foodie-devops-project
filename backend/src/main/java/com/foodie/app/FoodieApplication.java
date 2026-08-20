package com.foodie.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.foodie.app.model.Dish;
import com.foodie.app.repository.DishRepository;

@SpringBootApplication
public class FoodieApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodieApplication.class, args);
    }

    // Seed some sample dishes on startup (only if table is empty)
    @Bean
    CommandLineRunner seedData(DishRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(new Dish("Margherita Pizza", "Classic delight with 100% real mozzarella", 199.0, 4.6, null));
                repo.save(new Dish("Chicken Burger", "Crispy chicken, lettuce, mayo & cheese", 149.0, 4.5, null));
                repo.save(new Dish("Chicken Biryani", "Aromatic basmati rice with chicken", 249.0, 4.7, null));
                repo.save(new Dish("Pasta Alfredo", "Creamy white sauce pasta", 179.0, 4.4, null));
                repo.save(new Dish("Chocolate Cake", "Rich chocolate cake", 129.0, 4.6, null));
            }
        };
    }
}
