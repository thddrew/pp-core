import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/prisma/queries/users";
import { getCore } from "@/sanity/queries/core";

export default async function Playground() {
  const coreItems = await getCore();
  const users = await getUsers();

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
        <TableBody>
          {coreItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.clerkId}</TableCell>
              <TableCell>{user.plaidAccountId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">{coreItems.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
