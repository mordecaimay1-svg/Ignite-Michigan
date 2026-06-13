import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Video, BookOpen } from "lucide-react";

const RESOURCES = [
  {
    title: "About Our Movement",
    desc: "Learn about Ignite Michigan's mission and community.",
    href: "/about",
    icon: BookOpen,
  },
  {
    title: "Latest Articles",
    desc: "Education and civic engagement resources.",
    href: "/news",
    icon: FileText,
  },
  {
    title: "Upcoming Events",
    desc: "Gatherings, trainings, and community meetings.",
    href: "/events",
    icon: Video,
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Resources</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {RESOURCES.map((r) => (
          <Card key={r.href}>
            <CardHeader>
              <r.icon className="h-8 w-8 text-[var(--gold)]" />
              <CardTitle className="text-lg">{r.title}</CardTitle>
              <CardDescription>{r.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={r.href}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
