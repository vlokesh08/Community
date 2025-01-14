'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from './mode-toggle'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav className="bg-neutral-100 dark:bg-neutral-900">
        <div className='flex container mx-auto max-w-6xl items-center justify-between py-4 '>

      <div className="text-xl font-bold">
        <Link href="/">TelComm</Link>
      </div>
      
        <div className="flex items-center space-x-4">
          <Link href="/discussions" className="text-foreground hover:text-primary">
            Discussions
          </Link>
          <Link href="/dashboard" className="text-foreground hover:text-primary">
            Events
          </Link>
          {!isHome && (
            <>
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                      <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/signin">
                  <Button>Sign in</Button>
                </Link>
              )}
            </>
          )}
          <ModeToggle />
        </div>
      </div>

    </nav>
  )
}

