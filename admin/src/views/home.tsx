import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HomeView() {
  return (
    <div className="flex">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="grow">
        <ScrollArea style={{ padding: '30px' }} className="h-screen">
          <div style={{ height: '25px' }}></div>
          <h2 className="text-2xl tracking-tight">Good Morning</h2>
          <div style={{ height: '8px' }}></div>
          <h2 className="text-4xl font-bold tracking-tight">Shardul Nalegave.</h2>
          <div style={{ height: '30px' }}></div>
          <Tabs defaultValue='overview'>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issue">
                Issue Book
              </TabsTrigger>
              <TabsTrigger value="renew">
                Renew Book
              </TabsTrigger>
              <TabsTrigger value="return">
                Return Book
              </TabsTrigger>
            </TabsList>

            <TabsContent value='overview' style={{ marginTop: '30px' }}>
              <h1>Overview</h1>
            </TabsContent>

            <TabsContent value='issue' style={{ marginTop: '30px' }}>
              <h1>Issue Book</h1>
            </TabsContent>

            <TabsContent value='renew' style={{ marginTop: '30px' }}>
              <h1>Renew Book</h1>
            </TabsContent>

            <TabsContent value='return' style={{ marginTop: '30px' }}>
              <h1>Return Book</h1>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}