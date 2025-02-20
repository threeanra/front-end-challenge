import DataTable from "@/components/DataTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-5">
      <div className="flex flex-col items-center gap-20 py-16">
        <span className="font-bold text-4xl">
          Front-End{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
            Challenge
          </span>
        </span>
        <DataTable />
      </div>
    </main>
  );
}
