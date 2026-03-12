import { ImagePlaceholder, PlaceHolderImages } from "./placeholder-images";

export type UserRole = 'ADMIN' | 'ORGANIZER' | 'BIDDER';

export interface AuctionItem {
  id: string;
  name: string;
  description: string;
  startingBid: number;
  currentBid: number;
  bidCount: number;
  category: string;
  condition: string;
  image: string;
  endsAt: string;
  organizerId: string;
  status: 'ACTIVE' | 'ENDED' | 'DRAFT';
}

export const MOCK_AUCTIONS: AuctionItem[] = [
  {
    id: '1',
    name: 'Vintage 1960s Omega Seamaster',
    description: 'A beautifully preserved piece of horological history. This Seamaster features a stunning patina dial and original mechanical movement.',
    startingBid: 1200,
    currentBid: 1850,
    bidCount: 14,
    category: 'Jewelry',
    condition: 'Vintage - Excellent',
    image: PlaceHolderImages.find(img => img.id === 'item-watch')?.imageUrl || '',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    organizerId: 'org1',
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Abstract Horizon No. 4',
    description: 'An original 36x48 oil on canvas by rising artist Elena Vance. Bold textures and a calming palette make this a perfect focal piece.',
    startingBid: 3000,
    currentBid: 4200,
    bidCount: 8,
    category: 'Art',
    condition: 'New',
    image: PlaceHolderImages.find(img => img.id === 'item-art')?.imageUrl || '',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    organizerId: 'org1',
    status: 'ACTIVE',
  },
  {
    id: '3',
    name: '7-Day Tuscany Villa Retreat',
    description: 'A private stay for up to 6 people in a restored 18th-century farmhouse. Includes private chef dinner and vineyard tour.',
    startingBid: 5000,
    currentBid: 5500,
    bidCount: 3,
    category: 'Experience',
    condition: 'New',
    image: PlaceHolderImages.find(img => img.id === 'item-experience')?.imageUrl || '',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    organizerId: 'org2',
    status: 'ACTIVE',
  },
  {
    id: '4',
    name: 'Rare 1974 E-Type Jaguar',
    description: 'One of the most iconic British sports cars ever made. Fully restored with matching numbers.',
    startingBid: 25000,
    currentBid: 32000,
    bidCount: 22,
    category: 'Collector',
    condition: 'Restored',
    image: PlaceHolderImages.find(img => img.id === 'item-car')?.imageUrl || '',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    organizerId: 'org2',
    status: 'ACTIVE',
  },
  {
    id: '5',
    name: 'Natural Blue Sapphire Pendant',
    description: 'A 5-carat unheated sapphire set in 18k white gold with a halo of brilliant-cut diamonds.',
    startingBid: 8000,
    currentBid: 8000,
    bidCount: 0,
    category: 'Jewelry',
    condition: 'New',
    image: PlaceHolderImages.find(img => img.id === 'item-jewelry')?.imageUrl || '',
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 120).toISOString(),
    organizerId: 'org1',
    status: 'ACTIVE',
  }
];

export const MOCK_USERS = [
  { id: '1', name: 'Alex Admin', email: 'admin@communibid.com', role: 'ADMIN' as UserRole },
  { id: '2', name: 'Sarah Organizer', email: 'sarah@foundation.org', role: 'ORGANIZER' as UserRole },
  { id: '3', name: 'John Bidder', email: 'john@gmail.com', role: 'BIDDER' as UserRole },
];