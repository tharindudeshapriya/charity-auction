"use client"

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, History, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BiddingHistoryPage() {
  const { user } = useAuth();
  if (user?.role !== 'BIDDER') return null;

  const history = [
    { id: 'h1', item: 'Vintage Omega Watch', date: '2023-11-15', amount: 1850, status: 'Outbid', charity: 'Global Education Fund' },
    { id: 'h2', item: 'Tuscany Villa Stay', date: '2023-11-10', amount: 5500, status: 'Winning', charity: 'Rural Medical Aid' },
    { id: 'h3', item: 'E-Type Jaguar', date: '2023-11-05', amount: 32000, status: 'Won', charity: 'Ocean Protection' },
    { id: 'h4', item: 'Abstract Horizon Art', date: '2023-10-28', amount: 4200, status: 'Ended', charity: 'Local Arts Council' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">Bidding History</h1>
        <p className="text-muted-foreground">A complete record of your contributions and activity on CommuniBid.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold">Item & Charity</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Your Bid</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id} className="group cursor-pointer">
                  <TableCell>
                    <div className="font-bold group-hover:text-primary transition-colors">{entry.item}</div>
                    <div className="text-[10px] font-bold text-accent uppercase tracking-widest">{entry.charity}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar size={14} /> {entry.date}
                    </div>
                  </TableCell>
                  <TableCell className="font-headline font-bold">${entry.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={entry.status === 'Won' ? 'default' : 'secondary'} className="rounded-full font-bold px-3">
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card className="bg-primary text-white border-none shadow-xl">
          <CardContent className="p-8 space-y-4">
            <div className="p-3 bg-white/10 rounded-2xl w-fit">
              <History size={24} />
            </div>
            <h3 className="text-3xl font-headline font-bold">Total Impact</h3>
            <p className="text-primary-foreground/70 leading-relaxed">Through your bidding activity, you have helped raise over <span className="text-white font-bold">$43,550</span> for our verified charity partners this year.</p>
          </CardContent>
        </Card>
        
        <div className="p-8 rounded-3xl border-2 border-dashed border-primary/20 flex flex-col justify-center items-center text-center space-y-4">
          <h4 className="font-headline font-bold text-xl text-primary">Need help with an item?</h4>
          <p className="text-sm text-muted-foreground max-w-xs">Our concierge team is available 24/7 to assist with payment, shipping, or valuation questions.</p>
          <Button variant="outline" className="rounded-full px-8">Contact Concierge</Button>
        </div>
      </div>
    </div>
  );
}
