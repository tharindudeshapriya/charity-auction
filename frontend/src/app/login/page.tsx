"use client"

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gavel, Mail, Lock, User, Github, Sparkles, ShieldCheck, Briefcase, UserCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a successful login for the UI demo
    setTimeout(() => {
      login('BIDDER');
      router.push('/dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: 'ADMIN' | 'ORGANIZER' | 'BIDDER') => {
    login(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
              <Gavel size={32} />
            </div>
            <h1 className="text-3xl font-headline font-bold text-primary">Welcome to CommuniBid</h1>
            <p className="text-muted-foreground">Join the elite community of high-impact givers.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg font-bold">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg font-bold">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-none shadow-xl shadow-primary/5">
                <CardHeader>
                  <CardTitle className="font-headline">Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input id="email" type="email" placeholder="name@example.com" className="pl-10 py-6 rounded-xl" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <Button variant="link" className="px-0 text-xs font-bold text-accent">Forgot password?</Button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input id="password" type="password" placeholder="••••••••" className="pl-10 py-6 rounded-xl" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 font-bold" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground font-bold">Quick Demo Access</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      variant="outline" 
                      className="py-6 rounded-xl gap-3 font-bold justify-start px-6 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                      onClick={() => handleDemoLogin('ADMIN')}
                    >
                      <ShieldCheck size={18} className="text-primary" />
                      Login as Administrator
                    </Button>
                    <Button 
                      variant="outline" 
                      className="py-6 rounded-xl gap-3 font-bold justify-start px-6 border-accent/20 hover:bg-accent/5 hover:text-accent transition-all"
                      onClick={() => handleDemoLogin('ORGANIZER')}
                    >
                      <Briefcase size={18} className="text-accent" />
                      Login as Organizer
                    </Button>
                    <Button 
                      variant="outline" 
                      className="py-6 rounded-xl gap-3 font-bold justify-start px-6 border-muted-foreground/20 hover:bg-secondary transition-all"
                      onClick={() => handleDemoLogin('BIDDER')}
                    >
                      <UserCircle size={18} />
                      Login as Bidder
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-center text-xs text-muted-foreground w-full font-medium">
                    Secure 256-bit encrypted connection.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-none shadow-xl shadow-primary/5">
                <CardHeader>
                  <CardTitle className="font-headline">Create Account</CardTitle>
                  <CardDescription>Start your philanthropic journey with CommuniBid.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input id="fullName" placeholder="John Doe" className="pl-10 py-6 rounded-xl" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input id="signup-email" type="email" placeholder="name@example.com" className="pl-10 py-6 rounded-xl" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Create Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input id="signup-password" type="password" placeholder="Min. 8 characters" className="pl-10 py-6 rounded-xl" required />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex gap-3 items-start">
                      <Sparkles className="text-accent shrink-0" size={18} />
                      <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                        By signing up, you agree to our Terms of Service and Privacy Policy. You'll receive updates on impact reports and upcoming auctions.
                      </p>
                    </div>
                    <Button type="submit" className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 font-bold" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <p className="text-center text-xs text-muted-foreground w-full font-medium italic">
                    98% of proceeds go directly to charity.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
