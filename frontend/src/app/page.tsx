
"use client"

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuctionCard } from '@/components/auction-card';
import { MOCK_AUCTIONS } from '@/app/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe, Award, History } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';
import { LiveActivityFeed } from '@/components/live-activity-feed';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useAuth();
  const featured = MOCK_AUCTIONS.slice(0, 3);
  const [currentBg, setCurrentBg] = useState(0);

  const heroBgs = [
    PlaceHolderImages.find(img => img.id === 'hero-auction-main')?.imageUrl || '',
    PlaceHolderImages.find(img => img.id === 'hero-charity')?.imageUrl || '',
    PlaceHolderImages.find(img => img.id === 'hero-luxury')?.imageUrl || ''
  ].filter(Boolean);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroBgs.length]);

  return (
    <div className="relative min-h-screen hero-gradient">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {heroBgs.map((bg, index) => (
            <div
              key={bg}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5)'
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-black/20 to-black/90" />
        </div>
        
        <div className="container relative z-10 px-6 text-center text-white space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Badge variant="outline" className="mt-8 inline-flex items-center bg-white/10 backdrop-blur-md border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
            <Sparkles size={14} className="text-accent mr-2" />
            Modern Philanthropy, Reimagined
          </Badge>
          <h1 className="text-5xl md:text-8xl font-headline font-bold leading-tight max-w-5xl mx-auto italic">
            Bid for a <span className="text-accent not-italic">Purpose</span>, <br className="hidden md:block" /> Own a <span className="text-accent not-italic">Legacy</span>.
          </h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            CommuniBid connects extraordinary items with extraordinary impact. Join an elite community of high-impact donors today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 pb-12">
            <Link href="/auctions" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white rounded-full px-12 py-8 text-xl font-bold shadow-2xl shadow-accent/40 transition-all hover:scale-105">
                Explore Auctions
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/5 text-white border-white/40 hover:bg-white/10 backdrop-blur-md rounded-full px-12 py-8 text-xl font-bold transition-all border-2">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-white dark:bg-card border-y">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { icon: Heart, label: 'Impact Raised', value: '$12.4M' },
              { icon: Globe, label: 'Global Bidders', value: '45k+' },
              { icon: Award, label: 'Curated Items', value: '2,800' },
              { icon: Sparkles, label: 'Verified Charities', value: '150+' },
            ].map((stat, i) => (
              <div key={i} className="space-y-4 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="inline-flex p-4 rounded-2xl bg-primary/5 text-primary">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-headline font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none">
                Closing Soon
              </Badge>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary">Live Curations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Exclusive items and once-in-a-lifetime experiences hand-picked for their unique value and impact potential.
              </p>
            </div>
            <Link href="/auctions">
              <Button variant="link" className="text-primary font-bold text-lg gap-2 hover:text-accent transition-all p-0">
                View Auction Gallery <ArrowRight size={20} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Activity Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1 space-y-6">
              <Badge variant="outline" className="text-accent border-accent/30 font-bold tracking-widest uppercase text-[10px] px-3">
                Live Community
              </Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight">A Legacy of Impact</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every bid on CommuniBid tells a story of transformation. From medical research to conservation, your contribution creates lasting change.
              </p>
              {!user && (
                <Link href="/login">
                  <Button className="rounded-full px-8 py-6 bg-primary font-bold shadow-xl shadow-primary/20">Join the Community</Button>
                </Link>
              )}
            </div>
            <div className="lg:col-span-2">
              {user ? (
                <LiveActivityFeed />
              ) : (
                <div className="space-y-6">
                  {[
                    { title: "Vintage Patek Philippe", price: "$42,000", charity: "Red Cross", time: "Sold Oct 2023" },
                    { title: "Tuscany Vineyard Experience", price: "$12,500", charity: "Water.org", time: "Sold Sep 2023" },
                    { title: "Contemporary Masterpiece", price: "$8,200", charity: "UNICEF", time: "Sold Aug 2023" },
                  ].map((story, i) => (
                    <div key={i} className="p-8 rounded-3xl border bg-card/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/20 transition-all">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest italic">
                          <History size={14} /> {story.time}
                        </div>
                        <h4 className="text-2xl font-headline font-bold text-primary">{story.title}</h4>
                        <p className="text-muted-foreground">Benefiting <span className="font-bold text-foreground">{story.charity}</span></p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-headline font-bold text-primary">{story.price}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Donated Proceeds</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
