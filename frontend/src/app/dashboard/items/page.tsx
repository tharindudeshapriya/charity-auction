"use client"

import { useAuth } from '@/hooks/use-auth';
import { MOCK_AUCTIONS } from '@/app/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreVertical, Edit2, Trash2, Eye, PlusCircle, ImagePlus } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export default function ItemsManagementPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user?.role !== 'ADMIN') return null;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      toast({
        title: "Auction Listed",
        description: "The item has been manually added to the gallery successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-primary">Items Management</h1>
          <p className="text-muted-foreground">Monitor and manage all auction listings across the platform.</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full px-6 bg-primary font-bold gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105">
              <PlusCircle size={18} /> Add Item Manually
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] w-[95vw] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
            <form onSubmit={handleAddItem} className="flex flex-col h-full overflow-hidden">
              <ScrollArea className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8 space-y-8">
                  <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl md:text-3xl font-headline font-bold text-primary text-left">New Auction Listing</DialogTitle>
                    <DialogDescription className="text-sm md:text-base text-left">
                      Establish a new high-value listing for the global community.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Item Name</Label>
                        <Input id="name" placeholder="e.g. Signed Picasso Sketch" required className="py-6 rounded-xl border-2 border-secondary focus:border-primary/20 bg-secondary/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                        <Select required>
                          <SelectTrigger className="py-6 rounded-xl border-2 border-secondary focus:border-primary/20 bg-secondary/5">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Art">Art</SelectItem>
                            <SelectItem value="Jewelry">Jewelry</SelectItem>
                            <SelectItem value="Experience">Experience</SelectItem>
                            <SelectItem value="Collector">Collector Item</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startingBid" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Starting Bid ($)</Label>
                        <Input id="startingBid" type="number" placeholder="5000" required className="py-6 rounded-xl border-2 border-secondary focus:border-primary/20 bg-secondary/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endsAt" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Auction End Date</Label>
                        <Input id="endsAt" type="datetime-local" required className="py-6 rounded-xl border-2 border-secondary focus:border-primary/20 bg-secondary/5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Item Description & Provenance</Label>
                      <Textarea id="description" placeholder="Detail the item's history, condition, and charitable impact..." className="min-h-[120px] rounded-2xl border-2 border-secondary focus:border-primary/20 bg-secondary/5 p-4" required />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Item Gallery</Label>
                      <div className="relative group cursor-pointer">
                        <div className="border-2 border-dashed border-secondary rounded-2xl p-6 md:p-8 text-center transition-all group-hover:border-primary/30 group-hover:bg-primary/5">
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-3 md:p-4 rounded-full bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                              <ImagePlus size={28} className="md:size-8" />
                            </div>
                            <p className="text-sm font-bold text-primary">Upload Item Photos</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">PNG, JPG or WebP up to 10MB</p>
                          </div>
                        </div>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="bg-secondary/20 p-6 md:p-8 flex flex-col sm:flex-row justify-end gap-3 md:gap-4 border-t border-border/50 shrink-0">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-full px-8 font-bold text-muted-foreground order-2 sm:order-1">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="rounded-full px-10 bg-primary font-bold shadow-xl shadow-primary/20 order-1 sm:order-2">
                  {isSubmitting ? "Listing Item..." : "Publish Auction"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm overflow-hidden rounded-[2rem]">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-border/50 bg-secondary/10 backdrop-blur-md gap-4">
          <div className="relative flex-1 w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Search global inventory..." className="pl-12 py-6 rounded-xl border-2 border-secondary/50 bg-background focus:border-primary/20 transition-colors" />
          </div>
          <Button variant="outline" size="sm" className="w-full md:w-auto gap-2 rounded-xl py-6 px-6 border-2 border-secondary/50 bg-background hover:bg-secondary/20 hover:border-primary/20 transition-all font-bold">
            <Filter size={18} /> Advanced Filters
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold py-6 px-8 whitespace-nowrap">Item Description</TableHead>
                <TableHead className="font-bold whitespace-nowrap">Category</TableHead>
                <TableHead className="font-bold text-center whitespace-nowrap">Status</TableHead>
                <TableHead className="font-bold text-right whitespace-nowrap">Current Bid</TableHead>
                <TableHead className="font-bold text-right pr-8 whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_AUCTIONS.map((item) => (
                <TableRow key={item.id} className="group transition-colors border-b border-border/50">
                  <TableCell className="py-6 px-8 min-w-[200px]">
                    <div className="font-bold text-primary group-hover:text-accent transition-colors">{item.name}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">SKU: {item.id}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-bold px-3">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={item.status === 'ACTIVE' ? 'default' : 'secondary'} className={`rounded-full font-bold px-4 ${item.status === 'ACTIVE' ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-headline font-bold text-lg text-primary">${item.currentBid.toLocaleString()}</TableCell>
                  <TableCell className="text-right pr-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 transition-colors">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2 min-w-[180px]">
                        <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                          <Eye size={16} className="text-muted-foreground" /> 
                          <span className="font-bold">View Listing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                          <Edit2 size={16} className="text-muted-foreground" /> 
                          <span className="font-bold">Modify Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer text-destructive focus:bg-destructive/5 focus:text-destructive">
                          <Trash2 size={16} /> 
                          <span className="font-bold">Terminate Auction</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
