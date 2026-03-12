"use client"

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Shield, Lock, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, preferences, and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Profile Section */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <User size={18} className="text-accent" />
                <CardTitle className="text-lg font-headline">Public Profile</CardTitle>
              </div>
              <CardDescription>This information will be visible to other bidders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-bold">Full Name</Label>
                  <Input id="firstName" defaultValue={user.name} className="rounded-xl py-6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold">Email Address</Label>
                  <Input id="email" defaultValue={user.email} className="rounded-xl py-6" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="font-bold">Philanthropic Bio</Label>
                <Input id="bio" placeholder="Tell us about the causes you support..." className="rounded-xl py-6" />
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Lock size={18} className="text-accent" />
                <CardTitle className="text-lg font-headline">Password & Security</CardTitle>
              </div>
              <CardDescription>Update your credentials to keep your account safe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPass" className="font-bold">Current Password</Label>
                <Input id="currentPass" type="password" placeholder="••••••••" className="rounded-xl py-6" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPass" className="font-bold">New Password</Label>
                  <Input id="newPass" type="password" placeholder="••••••••" className="rounded-xl py-6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPass" className="font-bold">Confirm New Password</Label>
                  <Input id="confirmPass" type="password" placeholder="••••••••" className="rounded-xl py-6" />
                </div>
              </div>
              <Button variant="outline" className="rounded-full mt-2">Update Password</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Notifications Section */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Bell size={18} className="text-accent" />
                <CardTitle className="text-lg font-headline">Notifications</CardTitle>
              </div>
              <CardDescription>Stay updated on your bids.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Outbid Alerts</Label>
                  <p className="text-xs text-muted-foreground">Notify me immediately if outbid.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">New Auctions</Label>
                  <p className="text-xs text-muted-foreground">Weekly digest of new items.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Impact Reports</Label>
                  <p className="text-xs text-muted-foreground">Updates from charities you support.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card className="border-none shadow-sm bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={18} className="text-primary" />
                <CardTitle className="text-lg font-headline">Privacy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Anonymous Bidding</Label>
                <Switch />
              </div>
              <p className="text-[10px] text-muted-foreground">When enabled, your name will be masked as "B***r" on all public auction listings.</p>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="w-full py-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg gap-3 shadow-xl shadow-primary/20"
          >
            {loading ? "Saving..." : <><Save size={20} /> Save All Changes</>}
          </Button>
        </div>
      </div>
    </div>
  );
}
