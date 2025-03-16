import { Button } from "@/components/ui/button";
import {redirect} from "next/navigation";

export default function Home() {
  redirect("/upload") 

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Button>Click me</Button>
    </div> 
  );
}
