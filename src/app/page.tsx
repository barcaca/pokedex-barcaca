import { Suspense } from 'react'

import { Footer } from '@/components/layout/footer'
import { PokemonCard } from '@/components/pokemon-card'
import { PokemonCardSkeleton } from '@/components/pokemon-card-skeleton'
import { SearchPokemon } from '@/components/search-pokemon'
import { getListPokemons } from '@/data/pokemon'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 15
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const pokemon =
    typeof searchParams.pokemon === 'string' ? searchParams.pokemon : undefined
  const listPokemon = await getListPokemons(page, limit, pokemon)

  const totalPage = Math.ceil(Math.min(listPokemon.count, 1025) / limit)

  return (
    <>
      <div className="mx-auto h-full w-full max-w-screen-xl">
        <SearchPokemon pokemon={pokemon} />
        <div className="flex flex-wrap justify-center">
          {listPokemon.results.length === 0 ? (
            <p>Nenhum Pokémon com esse nome encontrado.</p>
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
