"use client"

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Award, Users, Target } from 'lucide-react';

export default function AnalyticsPage() {
  const { user } = useAuth();
  if (user?.role !== 'ADMIN') return null;

  const categoryData: any[] = [];
  const trendData: any[] = [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">Advanced Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into platform performance and donation trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-sm flex items-center justify-center p-12">
          <p className="text-xl font-headline font-bold text-muted-foreground uppercase tracking-widest text-center">Revenue Trends: To Be Updated</p>
        </Card>

        <Card className="border-none shadow-sm flex items-center justify-center p-12">
          <p className="text-xl font-headline font-bold text-muted-foreground uppercase tracking-widest text-center">Category Analysis: To Be Updated</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Target, label: 'Average Bid Increase', value: 'To Be Updated' },
          { icon: Users, label: 'Retention Rate', value: 'To Be Updated' },
          { icon: Award, label: 'Top Charity', value: 'To Be Updated' },
          { icon: TrendingUp, label: 'Conversion', value: 'To Be Updated' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-primary/5 text-primary">
                <stat.icon size={20} />
              </div>
              <div className="text-lg font-headline font-bold">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
