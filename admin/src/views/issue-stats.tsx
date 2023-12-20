import { ScrollArea } from "@/components/ui/scroll-area";

export function IssueStatsView() {
  return (
    <ScrollArea style={{ padding: '30px' }} className="h-screen">
      <div style={{ height: '25px' }}></div>
      <h2 className="text-2xl tracking-tight">Issue Statistics</h2>
    </ScrollArea>
  );
}