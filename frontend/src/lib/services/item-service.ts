import { apiFetch } from '../api';

export interface Item {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  currentHighestBid: number;
  auctionEndTime: string;
  status: 'ACTIVE' | 'CLOSED';
  organizerUsername: string;
  winnerId?: number;
  winnerUsername?: string;
  // UI-only properties (adapted from backend or hardcoded)
  category?: string;
  image?: string;
  bidCount?: number;
}

export const itemService = {
  async getItems(page = 0, size = 10): Promise<{ content: Item[], totalPages: number }> {
    const response = await apiFetch(`/items?page=${page}&size=${size}`);
    const data = await response.json();
    
    // Enrich with UI-only properties
    const content = data.content.map((item: any) => ({
      ...item,
      category: 'Luxury Heritage', // Backend doesn't support categories yet
      image: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop`, // Placeholder
      bidCount: 5, // Placeholder
    }));
    
    return { content, totalPages: data.totalPages };
  },

  async getItemById(id: number | string): Promise<Item> {
    const response = await apiFetch(`/items/${id}`);
    const item = await response.json();
    
    return {
      ...item,
      category: 'Luxury Heritage',
      image: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop`,
      bidCount: 5,
    };
  },

  async searchItems(query: string, page = 0, size = 10): Promise<{ content: Item[], totalPages: number }> {
    const response = await apiFetch(`/items/search?query=${query}&page=${page}&size=${size}`);
    const data = await response.json();
    
    const content = data.content.map((item: any) => ({
      ...item,
      category: 'Luxury Heritage',
      image: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop`,
      bidCount: 5,
    }));
    
    return { content, totalPages: data.totalPages };
  },

  async createItem(item: { name: string, description: string, startingPrice: number, auctionEndTime: string }) {
    const response = await apiFetch('/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return response.json();
  },

  async updateItem(id: number, item: Partial<Item>) {
    const response = await apiFetch(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
    return response.json();
  },

  async placeBid(itemId: number, amount: number) {
    const response = await apiFetch(`/items/${itemId}/bids`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
    return response.json();
  },

  async getWinner(itemId: number) {
    const response = await apiFetch(`/items/${itemId}/winner`);
    return response.json();
  }
};
