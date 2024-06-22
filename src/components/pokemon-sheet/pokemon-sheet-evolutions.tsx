import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'

import { getEvolutions } from '@/data/pokemon'
import { formatterId, formatterName } from '@/lib/utils'
import { colors } from '@/types/pokemon-types'

import { PokemonBadge } from '../pokemon-badge'

interface PokemonSheetEvolutionsProps {
  evolutionChain: string
}
/**
 * This component renders the evolutions of a Pokémon.
 * @param evolutionChain - The URL of the evolution chain for the Pokémon.
 */
export async function PokemonSheetEvolutions({
  evolutionChain,
}: PokemonSheetEvolutionsProps) {
  // Fetch the Pokémon evolution data
  const evolutionData = await getEvolutions(evolutionChain)
  return (
    <div className="flex flex-col gap-2">
      <h3>Evolutions</h3>
      <Separator />
      {evolutionData.map((evo) => {
        return (
          <div key={evo.name} className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  width={96}
                  height={96}
                  src={evo.sprites ?? '/pokeball_icon.svg'}
                  alt=""
                />
                <h4 className="flex flex-col gap-1">
                  <span>{formatterName(evo.name)}</span>
                  <span>#{formatterId(evo.id)}</span>
                </h4>
              </div>
              <div className="hidden flex-col gap-2 xs:flex">
                {evo.types.map((type) => {
                  // Determine the badge style based on the type
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
            <Separator />
          </div>
        )
      })}
    </div>
  )
}
