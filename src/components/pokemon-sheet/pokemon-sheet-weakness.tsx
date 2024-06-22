import { APIResource } from '@/types/pokemon'
import { colors } from '@/types/pokemon-types'

import { PokemonBadge } from '../pokemon-badge'

interface PokemonSheetWeaknessProps {
  weaknesses: APIResource[]
}
/**
 * This component renders the weakness types of a Pokemon.
 * @param weaknesses - The array of weakness types of the Pokemon.
 */
export function PokemonSheetWeakness({
  weaknesses,
}: PokemonSheetWeaknessProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3>Weakness</h3>
      <div className="flex flex-wrap justify-end gap-2">
        {weaknesses.map((type) => {
          // Determine the badge style based on the type
          const badgeStyle = colors[type.name]?.badge || ''
          return (
            <PokemonBadge
              key={type.name}
              type={type.name}
              badgeStyle={badgeStyle}
            />
          )
        })}
      </div>
    </div>
  )
}
