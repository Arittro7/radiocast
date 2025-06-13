import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const Header = ({ headerTitle, titleClassName}: { headerTitle?: string; titleClassName?: string}) => {
  return (
    <header className="flex items-center justify-between">
      {headerTitle ? (
        <h1 className={cn(' font-bold', titleClassName)}>{headerTitle}</h1>
      ): <div />}
      <Link href="/discover" className=" font-semibold text-orange-400">
        See all
      </Link>
    </header>
  )
}

export default Header