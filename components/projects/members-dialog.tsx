"use client";

import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onUpdateMembers: (members: string[]) => void;
}

export function MembersDialog({
  open,
  onOpenChange,
  project,
  onUpdateMembers,
}: MembersDialogProps) {
  const [newMember, setNewMember] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.trim() && !project.members.includes(newMember.trim())) {
      onUpdateMembers([...project.members, newMember.trim()]);
      setNewMember("");
    }
  };

  const handleRemoveMember = (member: string) => {
    onUpdateMembers(project.members.filter((m) => m !== member));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Team Members</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form onSubmit={handleAddMember} className="flex gap-2">
            <Input
              placeholder="Add team member..."
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <Button type="submit">Add</Button>
          </form>
          <ScrollArea className="h-[200px] rounded-md border p-2">
            <div className="space-y-2">
              {project.members.map((member) => (
                <div
                  key={member}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <span>{member}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(member)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}