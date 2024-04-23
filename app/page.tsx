import { Navbar } from "./components/Navbar";
import { TableComponent } from "./components/Table";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-full">
      <Navbar />
      <TableComponent />
    </main>
  );
}
