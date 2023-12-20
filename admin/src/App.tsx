
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';

export default function App() {
  const root = window.document.documentElement;
  root.classList.add("dark");

  return (
    <div className='h-screen w-screen bg-zinc-950 text-white flex'>
      <div className='flex-none'>
        <Sidebar />
      </div>
      <div className='grow'>
        <Outlet />
      </div>
    </div>
  )
}
