import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <Skeleton className="h-12 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-32 w-full max-w-md" />
    </div>
  );
}
