"use client"

import Image from 'next/image';
import Link from 'next/link';
import { AuctionItem } from '@/app/lib/mock-data';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Timer, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AuctionCard({ item }: { item: AuctionItem }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const end = new Date(item.endsAt).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${mins}m`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [item.endsAt]);

  return (
    <Card className="group flex flex-col h-full overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 bg-card/60 backdrop-blur-sm rounded-[2rem]">
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <Badge className="bg-primary/80 backdrop-blur-md text-white font-medium border-none px-4 py-1.5 rounded-full">
            {item.category}
          </Badge>
          {item.bidCount > 15 && (
            <Badge variant="secondary" className="bg-accent/90 text-white font-medium border-none px-4 py-1.5 rounded-full flex gap-1.5 items-center">
              <TrendingUp size={14} /> Elite Interest
            </Badge>
          )}
        </div>
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2.5 text-sm font-bold border border-white/20 shadow-xl">
          <Timer size={16} className="text-accent" />
          <span className="text-primary">{timeLeft}</span>
        </div>
      </div>
      
      <CardContent className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-headline font-bold mb-3 group-hover:text-accent transition-colors line-clamp-1">{item.name}</h3>
        <p className="text-base text-muted-foreground line-clamp-2 mb-8 leading-relaxed flex-grow">
          {item.description}
        </p>
        
        <div className="flex justify-between items-end mt-auto pt-6 border-t">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Current Value</span>
            <div className="text-3xl font-headline font-bold text-primary">
              ${item.currentBid.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-secondary/50 px-3 py-1 rounded-full">
            <Users size={16} />
            <span>{item.bidCount} bids</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-8 pt-0 grid grid-cols-1 gap-4">
        <Link href={`/auctions/${item.id}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl py-7 text-lg font-bold transition-all shadow-xl shadow-primary/10 hover:shadow-primary/30">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}