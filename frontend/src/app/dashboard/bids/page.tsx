"use client"

import { useAuth } from '@/hooks/use-auth';
import { MOCK_AUCTIONS } from '@/app/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MyBidsPage() {
  const { user } = useAuth();
  if (user?.role !== 'BIDDER') return null;

  // Simulate active bids for the bidder
  const activeBids = MOCK_AUCTIONS.slice(0, 2);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">Active Bids</h1>
        <p className="text-muted-foreground">Keep track of the items you're currently competing for.</p>
      </div>

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
    </div>
  );
}
