import Link from 'next/link';
import { Gavel, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Gavel className="text-primary" size={24} />
              <span className="text-2xl font-headline font-bold text-primary">CommuniBid</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering communities through transparent, high-impact charity auctions. Join us in making a difference, one bid at a time.
            </p>
            <div className="flex gap-4">
              <Twitter className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={20} />
              <Facebook className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={20} />
              <Instagram className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={20} />
              <Linkedin className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={20} />
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/auctions" className="hover:text-primary transition-colors">Live Auctions</Link></li>
              <li><Link href="/upcoming" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
              <li><Link href="/impact" className="hover:text-primary transition-colors">Impact Report</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How Bidding Works</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-bold text-lg">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-bold text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3 items-center">
                <MapPin size={18} className="text-accent" />
                <span>To Be Updated</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-accent" />
                <span>To Be Updated</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-accent" />
                <span>To Be Updated</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CommuniBid. All rights reserved. Built for professional charity excellence.
        </div>
      </div>
    </footer>
  );
}