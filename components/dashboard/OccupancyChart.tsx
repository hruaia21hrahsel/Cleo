import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/context/AppContext";
import { cn } from "@/lib/utils";

export function OccupancyChart() {
  const { properties, rooms } = useApp();

  const occupancyData = properties.map((p) => {
    const propRooms = rooms.filter((r) => r.propertyId === p.id);
    const occupied = propRooms.filter((r) => r.status === "occupied").length;
    const rate = propRooms.length > 0 ? (occupied / propRooms.length) * 100 : 0;
    return { name: p.name, total: propRooms.length, occupied, rate };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy by Property</CardTitle>
        <CardDescription>Current room occupancy rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {occupancyData.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium truncate max-w-[180px]">{item.name}</span>
              <span
                className={cn(
                  "font-semibold",
                  item.rate >= 80 ? "text-green-600" : item.rate >= 50 ? "text-yellow-600" : "text-red-600"
                )}
              >
                {item.occupied}/{item.total} rooms ({item.rate.toFixed(0)}%)
              </span>
            </div>
            <Progress
              value={item.rate}
              className="h-2"
            />
          </div>
        ))}
        {occupancyData.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No properties yet
          </p>
        )}
      </CardContent>
    </Card>
  );
}
