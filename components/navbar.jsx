"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="h-12 flex items-center justify-between px-4 lg:px-12">
      <Link href="/">
        <Heart fill="var(--color-primary)" />
      </Link>
      <div className="flex items-center gap-8">
        <Link
          className={cn(
            "text-sm text-muted-foreground hover:text-black",
            pathname === "/report" && "text-black"
          )}
          href="/report"
        >
          Report
        </Link>
        <Link
          className={cn(
            "text-sm text-muted-foreground hover:text-black",
            pathname === "/dashboard" && "text-black"
          )}
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
