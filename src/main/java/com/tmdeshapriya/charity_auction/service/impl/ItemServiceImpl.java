package com.tmdeshapriya.charity_auction.service.impl;

import com.tmdeshapriya.charity_auction.dto.CreateItemRequest;
import com.tmdeshapriya.charity_auction.dto.ItemResponse;
import com.tmdeshapriya.charity_auction.entity.Item;
import com.tmdeshapriya.charity_auction.entity.ItemStatus;
import com.tmdeshapriya.charity_auction.entity.Role;
import com.tmdeshapriya.charity_auction.entity.User;
import com.tmdeshapriya.charity_auction.exception.AccessDeniedException;
import com.tmdeshapriya.charity_auction.exception.ResourceNotFoundException;
import com.tmdeshapriya.charity_auction.repository.ItemRepository;
import com.tmdeshapriya.charity_auction.repository.UserRepository;
import com.tmdeshapriya.charity_auction.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long createItem(CreateItemRequest request, Long userId) {
        // 1. Fetch the Organizer
        User organizer = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        // 2. Enforce Role-based creation
        if (organizer.getRole() != Role.ROLE_ADMIN && organizer.getRole() != Role.ROLE_ORGANIZER) {
            throw new AccessDeniedException("Only Admins and Organizers can create items");
        }

        // 3. Map DTO to Entity
        Item item = new Item();
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setStartingPrice(request.getStartingPrice());
        item.setCurrentHighestBid(request.getStartingPrice()); // Initial bid is starting price
        item.setAuctionEndTime(request.getAuctionEndTime());
        item.setStatus(ItemStatus.ACTIVE);
        item.setOrganizer(organizer);

        // 4. Save and return ID
        return itemRepository.save(item).getId();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ItemResponse> getActiveItems(Pageable pageable) {
        return itemRepository.findByStatus(ItemStatus.ACTIVE, pageable)
                .map(this::mapToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ItemResponse getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found: " + id));
        return mapToResponse(item);
    }

    private ItemResponse mapToResponse(Item item) {
        return ItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .startingPrice(item.getStartingPrice())
                .currentHighestBid(item.getCurrentHighestBid())
                .auctionEndTime(item.getAuctionEndTime())
                .status(item.getStatus())
                .organizerUsername(item.getOrganizer().getUsername())
                .build();
    }
}
