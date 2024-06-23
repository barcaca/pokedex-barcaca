'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import { Skeleton } from '../ui/skeleton'

/**
 * A functional component that renders a theme toggle button.
 * It uses the `useTheme` hook from `next-themes` to manage the theme state.
 * The button switches between a sun and moon icon, indicating the current theme.
 * The component also includes a loading state using the `Skeleton` component.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  /**
   * A function that switches the theme between 'dark' and 'light'.
   * It uses the `setTheme` function from `next-themes` to update the theme.
   */
  function switchTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  // Effect to set the `mounted` state to true when the component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render the loading state if the component is not yet mounted
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
