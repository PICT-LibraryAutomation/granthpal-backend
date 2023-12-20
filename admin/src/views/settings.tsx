import { ScrollArea } from "@/components/ui/scroll-area";

export function SettingsView() {
  return (
    <ScrollArea style={{ padding: '30px' }} className="h-screen">
      <div style={{ height: '25px' }}></div>
      <h2 className="text-2xl tracking-tight">Settings</h2>
    </ScrollArea>
  );
}