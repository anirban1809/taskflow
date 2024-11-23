"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required"),
  darkMode: z.boolean(),
  emailNotifications: z.boolean(),
  theme: z.enum(["zinc", "slate", "stone", "gray", "neutral", "red", "rose", "blue", "green", "violet"]),
});

const themes = [
  {
    name: "Zinc",
    value: "zinc",
  },
  {
    name: "Slate",
    value: "slate",
  },
  {
    name: "Stone",
    value: "stone",
  },
  {
    name: "Gray",
    value: "gray",
  },
  {
    name: "Neutral",
    value: "neutral",
  },
  {
    name: "Red",
    value: "red",
  },
  {
    name: "Rose",
    value: "rose",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Violet",
    value: "violet",
  },
];

export function GeneralSettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "My Workspace",
      darkMode: true,
      emailNotifications: true,
      theme: "neutral",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Here you would typically update the theme
    document.documentElement.style.setProperty("--primary", `var(--${data.theme})`);
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Manage your workspace preferences and settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="workspaceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your workspace.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Theme</FormLabel>
                  <FormDescription>
                    Choose the accent color for your workspace.
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4 pt-2"
                    >
                      {themes.map((theme) => (
                        <FormItem key={theme.value}>
                          <FormControl>
                            <RadioGroupItem
                              value={theme.value}
                              id={theme.value}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={theme.value}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div
                              className={cn(
                                "mb-2 h-6 w-6 rounded-full",
                                theme.value === "zinc" && "bg-zinc-900",
                                theme.value === "slate" && "bg-slate-900",
                                theme.value === "stone" && "bg-stone-900",
                                theme.value === "gray" && "bg-gray-900",
                                theme.value === "neutral" && "bg-neutral-900",
                                theme.value === "red" && "bg-red-600",
                                theme.value === "rose" && "bg-rose-600",
                                theme.value === "blue" && "bg-blue-600",
                                theme.value === "green" && "bg-green-600",
                                theme.value === "violet" && "bg-violet-600"
                              )}
                            />
                            {theme.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="darkMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Dark Mode</FormLabel>
                    <FormDescription>
                      Enable dark mode for the application.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive email notifications for important updates.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}