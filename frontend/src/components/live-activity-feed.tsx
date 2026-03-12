"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Gavel } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_ACTIVITIES = [
  { id: 1, user: 'Sarah M.', action: 'placed a bid', item: 'Vintage Watch', amount: 1950, time: '2m ago' },
  { id: 2, user: 'John D.', action: 'won the auction', item: 'Tuscany Villa', amount: 5500, time: '15m ago' },
  { id: 3, user: 'Elena V.', action: 'added new item', item: 'Modern Art', amount: null, time: '1h ago' },
  { id: 4, user: 'Mark P.', action: 'placed a bid', item: 'E-Type Jaguar', amount: 32500, time: '2h ago' },
];

export function LiveActivityFeed() {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['Alex R.', 'Maria S.', 'David L.', 'Sophia K.', 'Julian B.'];
      const items = ['Omega Seamaster', 'Abstract Horizon', 'Tuscany Villa', 'Natural Sapphire'];
      const actions = ['placed a bid', 'is watching', 'increased bid on'];
      
      const newActivity = {
        id: Date.now(),
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        item: items[Math.floor(Math.random() * items.length)],
        amount: Math.floor(Math.random() * 5000) + 1000,
        time: 'Just now'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 5)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md overflow-hidden animate-in fade-in duration-700">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-accent animate-pulse" />
          <CardTitle className="text-xl font-headline font-bold text-primary">Live Community Pulse</CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest text-accent border-accent/30">
          Real-time
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {activities.map((activity) => (
            <div key={activity.id} className="p-6 flex gap-4 items-start hover:bg-primary/5 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm text-primary shrink-0 group-hover:scale-110 transition-transform">
                {activity.user[0]}
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm leading-tight">
                    <span className="font-bold text-primary">{activity.user}</span> {activity.action} <span className="font-bold text-foreground">"{activity.item}"</span>
                  </p>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase whitespace-nowrap ml-4">
                    {activity.time}
                  </span>
                </div>
                {activity.amount && (
                  <div className="flex items-center gap-2 mt-1">
                    <Gavel size={12} className="text-accent" />
                    <span className="text-xs font-bold text-accent">${activity.amount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
