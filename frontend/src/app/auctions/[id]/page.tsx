"use client"

import { useState, useEffect, use } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MOCK_AUCTIONS } from '@/app/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timer, Users, TrendingUp, History, ShieldCheck, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ItemDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = MOCK_AUCTIONS.find(a => a.id === id);
  const [currentBid, setCurrentBid] = useState(item?.currentBid || 0);
  const [bidInput, setBidInput] = useState((item?.currentBid || 0) + 100);
  const [timeLeft, setTimeLeft] = useState('');
  const [bids, setBids] = useState([
    { bidder: 'J***n', amount: (item?.currentBid || 0), time: '2 mins ago' },
    { bidder: 'S***h', amount: (item?.currentBid || 0) - 200, time: '15 mins ago' },
    { bidder: 'A***x', amount: (item?.currentBid || 0) - 500, time: '1 hour ago' },
  ]);

  useEffect(() => {
    if (!item) return;
    const updateTime = () => {
      const end = new Date(item.endsAt).getTime();
      const now = new Date().getTime();
      const diff = end - now;
      if (diff <= 0) { setTimeLeft('Ended'); return; }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${mins}m ${secs}s`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [item]);

  if (!item) return <div>Not found</div>;

  const handleBid = () => {
    if (bidInput <= currentBid) {
      toast({
        title: "Invalid Bid",
        description: "Your bid must be higher than the current bid.",
        variant: "destructive",
      });
      return;
    }

    // Simulate placing a bid
    setCurrentBid(bidInput);
    setBids([{ bidder: 'You', amount: bidInput, time: 'Just now' }, ...bids]);
    setBidInput(bidInput + 100);
    
    toast({
      title: "Success!",
      description: `You are now the highest bidder at $${bidInput.toLocaleString()}`,
    });

    // Simulate someone outbidding you after 5 seconds
    setTimeout(() => {
      const newBid = bidInput + 250;
      setCurrentBid(newBid);
      setBids([{ bidder: 'R***y', amount: newBid, time: 'Just now' }, { bidder: 'You', amount: bidInput, time: '5 secs ago' }, ...bids.slice(1)]);
      toast({
        title: "Outbid!",
        description: `Someone just placed a higher bid of $${newBid.toLocaleString()}`,
        variant: "destructive",
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border bg-white dark:bg-card">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <div className="absolute top-6 left-6 flex gap-2">
                <Badge className="bg-primary/90 hover:bg-primary text-white px-4 py-1.5 rounded-full border-none font-bold">
                  {item.category}
                </Badge>
                <Badge className="bg-accent text-white px-4 py-1.5 rounded-full border-none font-bold flex gap-1 items-center">
                  <TrendingUp size={14} /> LIVE
                </Badge>
              </div>
            </div>
          </div>

          {/* Bidding Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-5xl font-headline font-bold text-primary leading-tight">{item.name}</h1>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Users size={18} className="text-accent" />
                  <span>{item.bidCount} Bidders</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Timer size={18} className="text-accent" />
                  <span>Ends in: <span className="text-foreground font-bold">{timeLeft}</span></span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 p-8 rounded-3xl border border-primary/5 space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground">Current High Bid</span>
                <span className="text-5xl font-headline font-bold text-primary">${currentBid.toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                  <Input 
                    type="number" 
                    value={bidInput} 
                    onChange={(e) => setBidInput(Number(e.target.value))}
                    className="pl-8 py-8 text-2xl font-bold rounded-2xl border-2 border-primary/20 focus-visible:ring-accent"
                  />
                </div>
                <Button 
                  onClick={handleBid}
                  className="w-full py-8 text-xl font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                >
                  Place Bid Now
                </Button>
                <p className="text-center text-xs text-muted-foreground font-medium">
                  By bidding, you agree to our Terms of Service.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl border bg-card/50">
              <ShieldCheck className="text-green-500 shrink-0" size={24} />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Safe & Secure Bidding</h4>
                <p className="text-xs text-muted-foreground">Your transactions are protected with high-grade encryption and expert authentication.</p>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-xl bg-secondary/50 p-1">
                <TabsTrigger value="description" className="rounded-lg font-bold">Details</TabsTrigger>
                <TabsTrigger value="history" className="rounded-lg font-bold">History</TabsTrigger>
                <TabsTrigger value="shipping" className="rounded-lg font-bold">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border bg-card">
                    <span className="text-xs text-muted-foreground block mb-1">Condition</span>
                    <span className="font-bold">{item.condition}</span>
                  </div>
                  <div className="p-4 rounded-xl border bg-card">
                    <span className="text-xs text-muted-foreground block mb-1">Location</span>
                    <span className="font-bold">Zurich, CH</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="pt-6">
                <div className="space-y-4">
                  {bids.map((bid, i) => (
                    <div key={i} className={`flex justify-between items-center p-4 rounded-xl border ${i === 0 ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                          {bid.bidder[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{bid.bidder}</p>
                          <p className="text-xs text-muted-foreground">{bid.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-headline font-bold text-primary">${bid.amount.toLocaleString()}</p>
                        {i === 0 && <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/30">Current</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}