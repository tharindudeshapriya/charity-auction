package com.tmdeshapriya.charity_auction.service;

import com.tmdeshapriya.charity_auction.dto.CreateItemRequest;
import com.tmdeshapriya.charity_auction.dto.ItemResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemService {
    Long createItem(CreateItemRequest request, Long userId);

    Page<ItemResponse> getActiveItems(Pageable pageable);

    ItemResponse getItemById(Long id);
}
