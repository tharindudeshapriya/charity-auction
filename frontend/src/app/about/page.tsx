"use client"

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Users, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Gavel, 
  BarChart3,
  Leaf,
  GraduationCap,
  Stethoscope,
  Palette
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import Link from 'next/link';

export default function AboutPage() {
  const missionImage = PlaceHolderImages.find(img => img.id === 'hero-art-gallery')?.imageUrl || '';
  const communityImage = PlaceHolderImages.find(img => img.id === 'hero-charity')?.imageUrl || '';
  const processImage = PlaceHolderImages.find(img => img.id === 'hero-luxury')?.imageUrl || '';

  const values = [
    {
      icon: ShieldCheck,
      title: "Uncompromising Integrity",
      description: "We maintain the highest standards of transparency and security in every auction, ensuring trust between donors and bidders."
    },
    {
      icon: Heart,
      title: "Direct Impact",
      description: "Every successful bid directly empowers our partner charities to solve critical global challenges."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "We connect extraordinary items with a worldwide network of passionate philanthropists and collectors."
    },
    {
      icon: Zap,
      title: "Innovation in Giving",
      description: "Leveraging cutting-edge technology to make charitable giving an engaging, real-time experience."
    }
  ];

  const impactAreas = [
    { icon: Stethoscope, label: "Healthcare", description: "Funding medical research and rural clinics." },
    { icon: GraduationCap, label: "Education", description: "Building schools and providing scholarships." },
    { icon: Leaf, label: "Environment", description: "Reforestation and ocean cleanup initiatives." },
    { icon: Palette, label: "Arts & Culture", description: "Preserving heritage and supporting local creators." }
  ];

  const steps = [
    {
      number: "01",
      title: "Expert Curation",
      description: "Our specialists authenticate and value every luxury item and unique experience donated to our platform."
    },
    {
      number: "02",
      title: "Elite Bidding",
      description: "Participate in real-time, transparent auctions with bidders from over 120 countries worldwide."
    },
    {
      number: "03",
      title: "Verifiable Impact",
      description: "98% of proceeds go directly to your chosen cause, with detailed impact reports sent to every winner."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-24 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/30 text-primary font-bold uppercase tracking-widest text-[10px]">
              Our Mission
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary leading-tight">
              Redefining Philanthropy Through <span className="text-accent italic">Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              CommuniBid was founded on a simple yet powerful idea: that extraordinary items should serve an extraordinary purpose. We are the premier destination for elite charity auctions.
            </p>
          </div>
        </section>

        {/* Vision & Story */}
        <section className="container mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src={missionImage} 
                alt="Our Vision" 
                fill 
                className="object-cover"
                data-ai-hint="art gallery interior"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white space-y-2">
                <p className="font-headline text-2xl font-bold">Curating Extraordinary Impact</p>
                <p className="text-white/80 text-sm font-medium">Our platform ensures that every high-value item finds a home where it can do the most good.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-headline font-bold text-primary">The CommuniBid Story</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Established in Zurich, CommuniBid began as a small collective of art collectors and non-profit leaders who saw a gap in the luxury auction market. We realized that traditional auction houses often prioritized profit over social impact.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We set out to create a platform where transparency is paramount and the thrill of the bid is directly tied to global progress. Today, we have evolved into a worldwide network, facilitating millions in donations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <CheckCircle2 size={20} className="text-accent" />
                    <span>Verified Charity Partners</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <CheckCircle2 size={20} className="text-accent" />
                    <span>Secure Escrow Payments</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <CheckCircle2 size={20} className="text-accent" />
                    <span>Expert Item Valuation</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-secondary/30 border border-primary/5">
                  <div className="text-4xl font-headline font-bold text-primary mb-1">150+</div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Global Partners</div>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/30 border border-primary/5">
                  <div className="text-4xl font-headline font-bold text-primary mb-1">98%</div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Funds Reached Cause</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-secondary/20 py-24 mb-32 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold text-primary">How CommuniBid Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our seamless three-step process ensures a world-class experience for both donors and bidders.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-primary/10 -z-10" />
              {steps.map((step, i) => (
                <div key={i} className="text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-primary/5 flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-2xl font-headline font-bold text-accent">{step.number}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-headline text-primary">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Categories */}
        <section className="container mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-headline font-bold text-primary">Your Passion, Their Progress</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We focus our efforts on four critical pillars of global development. Every item auctioned is tagged with the cause it supports, allowing you to bid on items that align with your personal philanthropic goals.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {impactAreas.map((area, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-2xl border bg-card hover:border-accent/30 transition-colors">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent">
                      <area.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary">{area.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square">
              <div className="absolute -inset-4 border-2 border-primary/5 rounded-[3rem]" />
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src={processImage} 
                  alt="Impact Categories" 
                  fill 
                  className="object-cover"
                  data-ai-hint="luxury watches jewelry"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-primary py-24 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Our Core Pillars</h2>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                These principles guide every decision we make, from the items we curate to the partners we select.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors border-none">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white">
                      <value.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-headline">{value.title}</h3>
                    <p className="text-primary-foreground/60 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="container mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-4xl font-headline font-bold text-primary">Join a Community of Purpose</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you are looking to donate an item of significant value or seeking to acquire a unique treasure, you are part of something larger. CommuniBid is more than just an auction site; it's a movement towards intentional, high-impact giving.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Exclusive access to authenticated luxury items",
                  "Direct connection to verified global charities",
                  "Real-time bidding with expert support",
                  "Detailed impact reports for every purchase"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Sparkles size={12} className="text-accent" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 pt-4">
                <Link href="/auctions">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105">
                    Explore Auctions
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full px-8 py-6 font-bold text-lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-square order-1 lg:order-2">
              <div className="absolute inset-0 border-2 border-accent/20 rounded-[3rem] translate-x-6 translate-y-6" />
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src={communityImage} 
                  alt="Our Community" 
                  fill 
                  className="object-cover"
                  data-ai-hint="charity gala event"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
