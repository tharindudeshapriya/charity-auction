package com.tmdeshapriya.charity_auction.config;

import com.tmdeshapriya.charity_auction.entity.Role;
import com.tmdeshapriya.charity_auction.entity.User;
import com.tmdeshapriya.charity_auction.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedData(UserRepository userRepository) {
        return args -> {
            if (!userRepository.existsByRole(Role.ROLE_ADMIN)) {
                User admin = new User();
                admin.setUsername("admin");
                // TODO: Inject PasswordEncoder and hash this password once security is added
                admin.setPassword("admin123"); 
                admin.setRole(Role.ROLE_ADMIN);
                
                userRepository.save(admin);
                System.out.println("Default admin user created: admin/admin123");
            }
        };
    }
}
