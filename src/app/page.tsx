import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {
  // redirect("/upload")

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mb-4">Navigation</h1>
        <ul className="space-y-2">
          <li>
            <Link href="/upload" className="block px-4 py-2 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600">
              Upload
            </Link>
          </li>
          <li>
            <Link href="/projects" className="block px-4 py-2 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600">
              Projects
            </Link>
          </li>
        </ul>

      </div>
      <div className="h-screen w-screen flex items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}
