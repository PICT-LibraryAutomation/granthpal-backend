import { icons } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
  return (
    <div className="h-screen border-r border-zinc-800" style={{ padding: '15px', width: '250px' }}>
      <Button variant="secondary" className="w-full justify-start">
        <icons.LayoutDashboard color='white' />
        <span style={{ width: '10px' }}></span>
        Dashboard
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button variant="ghost" className="w-full justify-start">
        <icons.Package color='white' />
        <span style={{ width: '10px' }}></span>
        Inventory
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button variant="ghost" className="w-full justify-start">
        <icons.BookDown color='white' />
        <span style={{ width: '10px' }}></span>
        Issue Statistics
      </Button>
      <div style={{ height: '10px' }}></div>
      <Separator />
      <div style={{ height: '10px' }}></div>
      <Button variant="ghost" className="w-full justify-start">
        <icons.Settings color='white' />
        <span style={{ width: '10px' }}></span>
        Settings
      </Button>
    </div>
  );
}