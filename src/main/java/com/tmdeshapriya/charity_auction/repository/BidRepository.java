package com.tmdeshapriya.charity_auction.repository;

import com.tmdeshapriya.charity_auction.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
}
