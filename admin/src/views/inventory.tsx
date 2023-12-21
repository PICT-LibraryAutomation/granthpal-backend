import { BookSearchCommand } from "@/components/book-search-command";
import { ScrollArea } from "@/components/ui/scroll-area";

export function InventoryView() {
  return (
    <>
      <BookSearchCommand />
      <ScrollArea style={{ padding: '30px' }} className="h-screen">
        <div style={{ height: '25px' }}></div>
        <h2 className="text-2xl tracking-tight">Inventory</h2>
      </ScrollArea>
    </>
  );
}