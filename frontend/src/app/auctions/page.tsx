"use client"
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuctionCard } from '@/components/auction-card';
import { Item, itemService } from '@/lib/services/item-service';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuctionGallery() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    loadItems();
  }, [search]); // Reload when search changes

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (search) {
        result = await itemService.searchItems(search);
      } else {
        result = await itemService.getItems();
      }
      setItems(result.content);
    } catch (err) {
      setError('Failed to load auctions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = items.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    return matchesCategory;
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
            <form onSubmit={(e) => { e.preventDefault(); loadItems(); }}>
              <Input 
                placeholder="Search by item name or keywords..." 
                className="pl-12 py-6 text-base rounded-xl border-border bg-white dark:bg-card shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
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

            <Button variant="outline" className="py-6 rounded-xl gap-2 px-6" onClick={loadItems}>
              <SlidersHorizontal size={18} /> Refresh
            </Button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Curating your experience...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24 space-y-4 bg-destructive/5 rounded-3xl border-2 border-dashed border-destructive/20">
            <div className="text-2xl font-headline font-bold text-destructive">{error}</div>
            <Button onClick={loadItems}>Try Again</Button>
          </div>
        ) : filtered.length > 0 ? (
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