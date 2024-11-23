import { redirect } from "next/navigation";
import { getAllProjectIds } from "@/lib/data";

export function generateStaticParams() {
  return getAllProjectIds().map(id => ({ id }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  redirect(`/projects/${params.id}/tasks`);
}