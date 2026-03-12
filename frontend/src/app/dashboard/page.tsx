"use client"

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Gavel, Users, TrendingUp } from 'lucide-react';
import { LiveActivityFeed } from '@/components/live-activity-feed';

import { itemService, Item } from '@/lib/services/item-service';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await itemService.getItems(0, 50); // Fetch top items for stats
        setItems(result.content);
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (!user) return null;

  const activeAuctions = items.filter(i => i.status === 'ACTIVE').length;
  const totalRevenue = items.filter(i => i.status === 'CLOSED').reduce((acc, i) => acc + i.currentHighestBid, 0);

  const adminStats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600 bg-green-50' },
    { label: 'Active Auctions', value: activeAuctions.toString(), icon: Gavel, color: 'text-primary bg-primary/5' },
    { label: 'Total Bidders', value: 'To Be Updated', icon: Users, color: 'text-muted-foreground bg-secondary/20' },
    { label: 'Conversion', value: 'To Be Updated', icon: TrendingUp, color: 'text-muted-foreground bg-secondary/20' },
  ];

  const chartData: any[] = [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">Welcome Back, {user.username}</h1>
        <p className="text-muted-foreground">Here is what is happening across CommuniBid today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-headline font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 italic">
                To Be Updated
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] pt-4 flex items-center justify-center">
            <p className="text-xl font-headline font-bold text-muted-foreground uppercase tracking-widest">Revenue Analytics: To Be Updated</p>
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          <LiveActivityFeed />
        </div>
      </div>
    </div>
  );
}
