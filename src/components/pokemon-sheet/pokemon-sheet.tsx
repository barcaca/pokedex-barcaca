import { getPokemonSpecies, getType } from '@/data/pokemon'
import { cn } from '@/lib/utils'
import { IPokemon } from '@/types/pokemon'

import { Separator } from '../ui/separator'
import { SheetContent } from '../ui/sheet'
import { PokemonSheetEvolutions } from './pokemon-sheet-evolutions'
import { PokemonSheetHeader } from './pokemon-sheet-header'
import { PokemonSheetInfo } from './pokemon-sheet-info'
import { PokemonSheetStats } from './pokemon-sheet-status'
import { PokemonSheetType } from './pokemon-sheet-type'
import { PokemonSheetWeakness } from './pokemon-sheet-weakness'

interface PokemonSheetProps {
  pokemon: IPokemon
}
/**
 * Renders a detailed sheet for a given Pokémon, including its species, types, weaknesses, information, stats, and evolutions.
 * @param pokemon - The Pokémon object to render the sheet for.
 */
export async function PokemonSheet({ pokemon }: PokemonSheetProps) {
  const { id, name, sprites, stats, types: pokemonTypes } = pokemon

  const image = sprites.other?.['official-artwork'].front_default

  // Fetch the Pokémon species data
  const speciesData = await getPokemonSpecies(id)

  // Fetch the Pokémon type data
  const typesData = await getType(pokemonTypes[0].type.name)

  // Await both promises and destructure the results
  const [species, types] = await Promise.all([speciesData, typesData])

  const flavorText = species.flavor_text_entries[1].flavor_text
  const weaknesses = types.damage_relations.double_damage_from

  // Render the Pokémon sheet component
  return (
    <SheetContent className={cn('space-y-3 overflow-y-auto')}>
      {/* Render the Pokémon header */}
      <PokemonSheetHeader
        pokemonId={id}
        pokemonName={name}
        pokemonImage={image}
        pokemonFlavorText={flavorText}
      />
      {/* Render the Pokémon type */}
      <Separator />
      <PokemonSheetType types={pokemonTypes} />
      {/* Render the Pokémon weakness */}
      <Separator />
      <PokemonSheetWeakness weaknesses={weaknesses} />
      {/* Render the Pokémon information */}
      <Separator />
      <PokemonSheetInfo height={pokemon.height} weight={pokemon.weight} />
      {/* Render the Pokémon stats */}
      <Separator />
      <PokemonSheetStats stats={stats} />
      {/* Render the Pokémon evolutions */}
      <PokemonSheetEvolutions evolutionChain={species.evolution_chain.url} />
    </SheetContent>
  )
}
