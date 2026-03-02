import { WifiOff, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">You&apos;re Offline</h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          No internet connection detected. Please check your connection and try again.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => window.location.reload()}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/"><Home className="mr-2 h-4 w-4" /> Home</Link>
        </Button>
      </div>
    </div>
  );
}
