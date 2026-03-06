package com.tmdeshapriya.charity_auction.controller;

import com.tmdeshapriya.charity_auction.dto.CreateItemRequest;
import com.tmdeshapriya.charity_auction.dto.ItemResponse;
import com.tmdeshapriya.charity_auction.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<Long> createItem(
            @Valid @RequestBody CreateItemRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        return new ResponseEntity<>(itemService.createItem(request, userId), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<ItemResponse>> getActiveItems(Pageable pageable) {
        return ResponseEntity.ok(itemService.getActiveItems(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }
}
