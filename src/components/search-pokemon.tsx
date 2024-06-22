'use client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

export function SearchPokemon({ pokemon }: { pokemon?: string }) {
  const router = useRouter()
  const [text, setText] = useState<string | undefined>(pokemon)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    router.push(`?pokemon=${text}`)
  }
  return (
    <form
      className="sticky top-0 z-10 m-4 mx-auto flex max-w-screen-xs gap-2 border-b border-border bg-background p-3 sm:static sm:border-0 md:p-4"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Pikachu, Mew, etc"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button title="Search" type="submit" variant={'outline'}>
        Search
      </Button>
    </form>
  )
}
