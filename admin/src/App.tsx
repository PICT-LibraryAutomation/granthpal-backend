
import { Outlet } from 'react-router-dom';

export default function App() {
  const root = window.document.documentElement;
  root.classList.add("dark");

  return (
    <div className='h-screen w-screen bg-zinc-950 text-white'>
      <Outlet />
    </div>
  )
}
