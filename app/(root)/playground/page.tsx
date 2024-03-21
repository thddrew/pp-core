import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Playground() {
  return (
    <section className="w-full p-4">
      <Table>
        <TableCaption>A list of core content.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </section>
  );
}
