
import TopBar from './components/top-bar';
import { ScrollArea } from './components/ui/scroll-area';

export default function App() {
  const root = window.document.documentElement;
  root.classList.add("dark");

  return (
    <div className='h-screen w-screen bg-zinc-950 text-white'>
      <TopBar />
      <ScrollArea style={{ padding: '30px' }}>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </ScrollArea>
    </div>
  )
}
