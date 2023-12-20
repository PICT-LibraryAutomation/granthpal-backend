import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { icons } from "lucide-react";

export function HomeView() {
  return (
    <ScrollArea style={{ padding: '30px' }} className="h-screen">
      <div style={{ height: '25px' }}></div>
      <h2 className="text-2xl tracking-tight">Hey there</h2>
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
          <div className='grid grid-cols-4 gap-4'>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Books Issued
                </CardTitle>
                <icons.BookDown color='white' />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Books in Library
                </CardTitle>
                <icons.Library color='white' />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1265</div>
              </CardContent>
            </Card>
          </div>
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
  );
}