"use client"

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Award, Users, Target } from 'lucide-react';

export default function AnalyticsPage() {
  const { user } = useAuth();
  if (user?.role !== 'ADMIN') return null;

  const categoryData = [
    { name: 'Jewelry', value: 400, color: 'hsl(var(--primary))' },
    { name: 'Art', value: 300, color: 'hsl(var(--accent))' },
    { name: 'Experience', value: 200, color: '#10b981' },
    { name: 'Collector', value: 100, color: '#6366f1' },
  ];

  const trendData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">Advanced Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into platform performance and donation trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Revenue Growth (6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="250">
              <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Target, label: 'Average Bid Increase', value: '28%', desc: 'Better than target' },
          { icon: Users, label: 'Retention Rate', value: '94%', desc: 'MoM improvement' },
          { icon: Award, label: 'Top Charity', value: 'Red Cross', desc: 'Highest funds raised' },
          { icon: TrendingUp, label: 'Conversion', value: '8.2%', desc: 'Visitor to bidder' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-primary/5 text-primary">
                <stat.icon size={20} />
              </div>
              <div className="text-2xl font-headline font-bold">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              <p className="text-[10px] text-green-500 font-bold">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
