import Dashboard from "./dashboard/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    // <Dashboard/>
    <>
      <Link href="/startLesson">
        <Button>Start Learning</Button>
      </Link>
    </>
  );
}
