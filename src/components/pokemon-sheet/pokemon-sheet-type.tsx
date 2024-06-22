import { colors, IPokemonType } from '@/types/pokemon-types'

import { PokemonBadge } from '../pokemon-badge'

interface PokemonSheetTypeProps {
  types: IPokemonType[]
}
/**
 * This component renders the Pokemon's types with their respective badges.
 * @param types - An array of Pokemon types, each containing a type object and a slot.
 */
export function PokemonSheetType({ types }: PokemonSheetTypeProps) {
  return (
    <div className="flex items-center justify-between">
      <h3>Type</h3>
      <div className="flex gap-2">
        {types.map((type) => {
          // Determine the badge style based on the type
          const badgeStyle = colors[type.type.name]?.badge || ''
          return (
            <PokemonBadge
              key={type.slot}
              type={type.type.name}
              badgeStyle={badgeStyle}
            />
          )
        })}
      </div>
    </div>
  )
}
