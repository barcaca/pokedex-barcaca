import { cn, formatterName } from '@/lib/utils'

import { Badge } from './ui/badge'

interface PokemonBadgeProps {
  type: string
  badgeStyle: string
}
/**
 * A functional component that renders a badge for a Pokémon type.
 *
 * @param type - The type of Pokémon (e.g., 'grass', 'fire', 'water').
 * @param badgeStyle - The CSS class(es) to apply to the badge.
 */
export function PokemonBadge({ type, badgeStyle }: PokemonBadgeProps) {
  return (
    <Badge className={cn('w-20 justify-center drop-shadow-dark', badgeStyle)}>
      <span className="tracking-wider text-white drop-shadow-dark">
        {formatterName(type)}
      </span>
    </Badge>
  )
}
