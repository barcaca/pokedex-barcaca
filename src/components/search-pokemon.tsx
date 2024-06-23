'use client'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

/**
 * A functional component that renders a search form for searching Pokémon.
 * @param props - The component props.
 * @param props.pokemon - The initial value for the search input.
 */
export function SearchPokemon({ pokemon }: { pokemon?: string }) {
  // Get the router object from Next.js navigation
  const router = useRouter()
  // State variable to store the search text
  const [text, setText] = useState<string | undefined>(pokemon)

  /**
   * Event handler for the form submission.
   * @param e - The form submission event.
   */
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Navigate to the search results page with the search text as a query parameter
    router.push(`?pokemon=${text}`)
  }
  return (
    <form
      className="sticky top-0 z-10 m-2 mx-auto flex max-w-screen-xs gap-2 border-b border-border bg-background p-3 sm:static sm:border-0 md:p-4"
      onSubmit={handleSubmit}
    >
      <Label className="relative w-full">
        <Input
          placeholder="Pikachu, Mew, etc"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Link
          href={{
            query: {
              page: 1,
            },
          }}
          className={
            !text
              ? 'hidden'
              : 'absolute right-4 top-1/2 -translate-y-1/2 rounded-full border p-1'
          }
          onClick={() => setText('')}
        >
          <X size={16} />
        </Link>
      </Label>
      <Button title="Search" type="submit" variant={'outline'}>
        Search
      </Button>
    </form>
  )
}
