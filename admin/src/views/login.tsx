import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginView() {
  return (
    <div className='h-screen w-screen flex'>
      <div className='flex-none' style={{ padding: '30px', width: '500px' }}>
        <div style={{ height: '75px' }}></div>
        <h2 className="text-4xl font-bold tracking-tight">Hey, There!</h2>
        <div style={{ height: '10px' }}></div>
        <h2 className="text-base font-mono">Login to access the Dashboard</h2>
        <div style={{ height: '35px' }}></div>
        <Input type='text' placeholder='PRN' />
        <div style={{ height: '10px' }}></div>
        <Input type='password' placeholder='Password' />
        <div style={{ height: '35px' }}></div>
        <Button>Login</Button>
      </div>
      <div className='grow hidden lg:block' style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}></div>
    </div>
  );
}