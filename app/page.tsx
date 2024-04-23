import { Navbar } from "./components/Navbar";
import { TableComponent } from "./components/Table";
import GroupedStackedChart from "./components/graph";
import { data } from "./components/data";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-full">
      <Navbar />
      <TableComponent data={data} />
      <GroupedStackedChart data={data} />
    </main>
  );
}
