import Image from 'next/image'

import { getPokemon } from '@/data/pokemon'
import { cn, formatterName } from '@/lib/utils'
import { colors } from '@/types/pokemon-types'

import { Icons } from './icons'
import { PokemonBadge } from './pokemon-badge'
import { PokemonCardNumber } from './pokemon-card-number'
import { PokemonSheet } from './pokemon-sheet'
import { Sheet, SheetTrigger } from './ui/sheet'

interface PokemonCardProps {
  pokemonName: string
}
export async function PokemonCard({ pokemonName }: PokemonCardProps) {
  const pokemon = await getPokemon(pokemonName)
  const primaryType = pokemon.types[0].type.name
  const cardStyle = colors[primaryType]?.card || ''

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative h-[270px] w-[220px]">
          <div className="h-full w-full">
            <Icons.card className={cn('absolute -z-10', cardStyle)} />
            <div className="h-full w-full">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <h2 className="text-center text-xl font-semibold text-white drop-shadow-dark">
                  {formatterName(pokemon.name)}
                </h2>
                <Image
                  width={96}
                  height={96}
                  src={pokemon.sprites.front_default ?? '/pokeball_icon.svg'}
                  alt={pokemon.name}
                />
                <div className="flex gap-2">
                  {pokemon.types.map((type) => {
                    const badgeStyle = colors[type.type.name]?.badge || ''
                    return (
                      <PokemonBadge
                        key={type.slot}
                        badgeStyle={badgeStyle}
                        type={type.type.name}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <PokemonCardNumber pokemonId={pokemon.id} cardStyle={cardStyle} />
        </div>
      </SheetTrigger>
      <PokemonSheet pokemon={pokemon} />
    </Sheet>
  )
}
