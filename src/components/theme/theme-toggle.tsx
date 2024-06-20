'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import { Skeleton } from '../ui/skeleton'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  function switchTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Skeleton className="absolute right-2 size-10 rounded-md md:right-10" />
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={switchTheme}
      className="absolute right-2 md:right-10"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
