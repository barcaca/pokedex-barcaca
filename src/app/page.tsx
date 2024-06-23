import Link from 'next/link'
import { Suspense } from 'react'

import { Footer } from '@/components/layout/footer'
import { PokemonCard } from '@/components/pokemon-card'
import { PokemonCardSkeleton } from '@/components/pokemon-card-skeleton'
import { SearchPokemon } from '@/components/search-pokemon'
import { buttonVariants } from '@/components/ui/button'
import { getListPokemons } from '@/data/pokemon'

/**
 * The Home component is the main page of the application.
 * It fetches and displays a list of Pokémon based on the search parameters.
 *
 * @param searchParams - An object containing the search parameters.
 * @param searchParams.limit - The number of Pokémon to display per page.
 * @param searchParams.page - The current page number.
 * @param searchParams.pokemon - The name of the Pokémon to search for.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Parse search parameters
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 15
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const pokemon =
    typeof searchParams.pokemon === 'string' ? searchParams.pokemon : undefined

  // Fetch list of Pokémon based on search parameters
  const listPokemon = await getListPokemons(page, limit, pokemon)

  // Calculate total number of pages
  const totalPage = Math.ceil(Math.min(listPokemon.count, 1025) / limit)

  return (
    <>
      <div className="mx-auto h-full w-full max-w-screen-xl">
        <SearchPokemon pokemon={pokemon} />
        <div className="flex flex-wrap justify-center">
          {listPokemon.results.length === 0 ? (
            <div className="flex flex-col items-center gap-2">
              <p>Nenhum Pokémon com esse nome encontrado.</p>
              <Link
                href={'/'}
                className={buttonVariants({ variant: 'outline' })}
              >
                Back to Home
              </Link>
            </div>
          ) : (
            listPokemon.results.map((pokemon) => (
              <Suspense key={pokemon.name} fallback={<PokemonCardSkeleton />}>
                <PokemonCard pokemonName={pokemon.name} />
              </Suspense>
            ))
          )}
        </div>
      </div>
      <Footer page={page} pokemon={pokemon} totalPage={totalPage} />
    </>
  )
}
