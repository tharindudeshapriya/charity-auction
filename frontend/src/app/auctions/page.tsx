"use client"

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuctionCard } from '@/components/auction-card';
import { MOCK_AUCTIONS } from '@/app/lib/mock-data';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuctionGallery() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = MOCK_AUCTIONS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl font-headline font-bold text-primary">Live Auction Gallery</h1>
          <p className="text-muted-foreground text-lg">Browse through unique treasures and once-in-a-lifetime experiences.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search by item name or keywords..." 
              className="pl-12 py-6 text-base rounded-xl border-border bg-white dark:bg-card shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Select onValueChange={setCategory} defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px] py-6 rounded-xl bg-white dark:bg-card shadow-sm">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Jewelry">Jewelry</SelectItem>
                <SelectItem value="Art">Art</SelectItem>
                <SelectItem value="Experience">Experience</SelectItem>
                <SelectItem value="Collector">Collector Items</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="py-6 rounded-xl gap-2 px-6">
              <SlidersHorizontal size={18} /> Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4 bg-secondary/20 rounded-3xl border-2 border-dashed border-border">
            <div className="text-4xl font-headline font-bold text-primary/40">No items found</div>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            <Button variant="link" onClick={() => {setSearch(''); setCategory('all');}}>Clear all filters</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}