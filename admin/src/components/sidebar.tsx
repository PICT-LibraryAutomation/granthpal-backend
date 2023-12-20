import { icons } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { useLocation, useNavigate } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-screen border-r border-zinc-800" style={{ padding: '15px', width: '250px' }}>
      <Button variant={location.pathname === '/' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => navigate('/')}>
        <icons.LayoutDashboard color='white' />
        <span style={{ width: '10px' }}></span>
        Dashboard
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button variant={location.pathname === '/inventory' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => navigate('/inventory')}>
        <icons.Package color='white' />
        <span style={{ width: '10px' }}></span>
        Inventory
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button variant={location.pathname === '/issue-stats' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => navigate('/issue-stats')}>
        <icons.BookDown color='white' />
        <span style={{ width: '10px' }}></span>
        Issue Statistics
      </Button>
      <div style={{ height: '10px' }}></div>
      <Separator />
      <div style={{ height: '10px' }}></div>
      <Button variant={location.pathname === '/settings' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => navigate('/settings')}>
        <icons.Settings color='white' />
        <span style={{ width: '10px' }}></span>
        Settings
      </Button>
    </div>
  );
}