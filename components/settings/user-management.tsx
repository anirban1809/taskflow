"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserList } from "./user-list";
import { InviteUserDialog } from "./invite-user-dialog";
import { UserRoleDialog } from "./user-role-dialog";
import { Plus } from "lucide-react";

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "member",
    status: "active",
    joinedAt: "2024-02-01T15:30:00Z",
  },
  {
    id: "3",
    email: "mike@example.com",
    name: "Mike Johnson",
    role: "member",
    status: "invited",
    joinedAt: "2024-03-10T09:00:00Z",
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const handleInviteUser = (email: string, role: User["role"]) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split("@")[0],
      role,
      status: "invited",
      joinedAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setInviteDialogOpen(false);
  };

  const handleUpdateRole = (userId: string, newRole: User["role"]) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    setRoleDialogOpen(false);
    setSelectedUser(null);
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage users and their access to the workspace
            </CardDescription>
          </div>
          <Button onClick={() => setInviteDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <UserList
          users={users}
          onRoleChange={(user) => {
            setSelectedUser(user);
            setRoleDialogOpen(true);
          }}
          onRemove={handleRemoveUser}
        />

        <InviteUserDialog
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
          onInvite={handleInviteUser}
        />

        <UserRoleDialog
          open={roleDialogOpen}
          onOpenChange={setRoleDialogOpen}
          onUpdateRole={handleUpdateRole}
          user={selectedUser}
        />
      </CardContent>
    </Card>
  );
}