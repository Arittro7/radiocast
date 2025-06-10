'use client';

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="left-sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
        >
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-2xl font-extrabold text-orange-500 max-lg:hidden">
            RadioCast
          </h1>
        </Link>
        {sidebarLinks.map(({ route, label, imgURL}) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`)

          return <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", { 'bg-[#c8cbc710] border-r-4 border-orange-500' : isActive})}>
            <Image src={imgURL} alt={label} width={24} height={24}/>
            <p>{label}</p>
          </Link>
        })}
      </nav>
    </section>
  );
};

export default LeftSidebar;
