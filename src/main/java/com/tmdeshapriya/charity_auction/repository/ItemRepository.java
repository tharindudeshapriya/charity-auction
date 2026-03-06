package com.tmdeshapriya.charity_auction.repository;

import com.tmdeshapriya.charity_auction.entity.Item;
import com.tmdeshapriya.charity_auction.entity.ItemStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByStatus(ItemStatus status, Pageable pageable);

    // Optimized DB query for the scheduler: only pull items that are ACTIVE and
    // expired
    List<Item> findByStatusAndAuctionEndTimeBefore(ItemStatus status, LocalDateTime time);

    Page<Item> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description,
            Pageable pageable);
}
