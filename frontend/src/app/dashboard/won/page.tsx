
"use client"

import { useAuth } from '@/hooks/use-auth';
import { MOCK_AUCTIONS } from '@/app/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, CheckCircle2, Truck, CreditCard, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function WonItemsPage() {
  const { user } = useAuth();
  if (user?.role !== 'BIDDER') return null;

  // Simulate won items
  const wonItems = [MOCK_AUCTIONS[3]];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Won Auctions</h1>
        <p className="text-sm md:text-base text-muted-foreground">Congratulations on your winning bids! Your impact starts here.</p>
      </div>

      {wonItems.length > 0 ? (
        <div className="grid gap-6">
          {wonItems.map((item) => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-72 aspect-video lg:aspect-square shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full shadow-xl">
                      <Trophy size={28} className="text-accent" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary leading-tight">{item.name}</h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          Winning Bid: <span className="text-primary font-bold text-lg ml-1">${item.currentBid.toLocaleString()}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full text-xs shrink-0 self-start sm:self-center">
                        <CheckCircle2 size={16} /> PAID & VERIFIED
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 rounded-2xl border bg-secondary/20 hover:bg-secondary/30 transition-colors">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          <Truck size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Shipping Status</p>
                          <p className="text-sm font-bold">In Transit to Zurich</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-2xl border bg-secondary/20 hover:bg-secondary/30 transition-colors">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Payment Method</p>
                          <p className="text-sm font-bold">Visa Ending 4242</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button className="flex-1 bg-primary rounded-full font-bold py-6 text-sm h-auto group">
                      Track Delivery <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-full font-bold py-6 text-sm h-auto border-primary/20 hover:bg-primary/5">
                      Download Receipt
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 bg-secondary/10 rounded-[2.5rem] border-2 border-dashed border-border/50">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Trophy size={32} className="text-muted-foreground/30" />
          </div>
          <p className="text-xl font-headline font-bold text-muted-foreground">No auctions won yet.</p>
          <Button variant="link" className="font-bold text-primary">Keep exploring live auctions</Button>
        </div>
      )}
    </div>
  );
}
