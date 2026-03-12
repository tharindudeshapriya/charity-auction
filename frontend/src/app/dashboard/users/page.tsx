"use client"

import { useAuth } from '@/hooks/use-auth';
import { MOCK_USERS } from '@/app/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, UserPlus, Shield, Mail } from 'lucide-react';

export default function UserManagementPage() {
  const { user } = useAuth();
  if (user?.role !== 'ADMIN') return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-primary">User Management</h1>
          <p className="text-muted-foreground">Manage roles and permissions for platform members.</p>
        </div>
        <Button className="rounded-full gap-2 bg-primary font-bold">
          <UserPlus size={18} /> Invite User
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="font-bold">User</TableHead>
                <TableHead className="font-bold">Role</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_USERS.map((u) => (
                <TableRow key={u.id} className="group">
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 bg-primary/10 text-primary">
                      <AvatarFallback className="font-bold">{u.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-bold">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Active</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
                        <Shield size={16} className="text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
                        <Mail size={16} className="text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
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
