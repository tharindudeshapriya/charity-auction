"use client"

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, ArrowUpRight, Search, Gavel } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MyBidsPage() {
  const { user } = useAuth();
  if (user?.role !== 'BIDDER') return null;

  // Active bids are currently not available via backend listing endpoint
  const activeBids: any[] = [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">Active Bids</h1>
        <p className="text-muted-foreground">Keep track of the items you're currently competing for.</p>
      </div>

      {activeBids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeBids.map((item, i) => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden flex flex-col">
              <div className="relative aspect-video">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className={i === 0 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {i === 0 ? "Highest Bidder" : "Outbid!"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 flex-grow space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold text-primary">{item.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><Clock size={16} /> Ends in 14h</div>
                    <div className="flex items-center gap-1"><TrendingUp size={16} /> {item.bidCount} bids</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-medium text-muted-foreground">Your Max Bid: $2,500</span>
                    <span className="font-bold text-primary">Current: ${item.currentBid.toLocaleString()}</span>
                  </div>
                  <Progress value={i === 0 ? 85 : 95} className="h-2" />
                </div>

                <div className="flex gap-4">
                  <Link href={`/auctions/${item.id}`} className="flex-1">
                    <Button className="w-full bg-primary font-bold rounded-full py-6">
                      Increase Bid
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <ArrowUpRight size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-6 bg-secondary/10 rounded-[2.5rem] border-2 border-dashed border-border/50">
          <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Gavel size={36} className="text-muted-foreground/30" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-headline font-bold text-muted-foreground">Active Bids: To Be Updated</p>
            <p className="text-muted-foreground max-w-md mx-auto">This feature is currently pending backend integration.</p>
          </div>
          <Link href="/auctions" className="inline-block">
            <Button className="rounded-full px-10 bg-primary font-bold shadow-xl shadow-primary/20">
              Browse Gallery
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
