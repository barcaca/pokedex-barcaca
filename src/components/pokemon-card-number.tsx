import { cn, formatterId } from '@/lib/utils'

import { Icons } from './icons'

interface PokemonCardNumberProps {
  pokemonId: number
  cardStyle: string
}
/**
 * A functional component that renders a Pokemon card number with a custom style.
 *
 * @param pokemonId - The unique identifier of the Pokemon.
 * @param cardStyle - The custom style class for the card number.
 */
export function PokemonCardNumber({
  pokemonId,
  cardStyle,
}: PokemonCardNumberProps) {
  return (
    <div className="absolute bottom-0 right-0 h-[43px] w-[132px] px-5 py-2.5">
      <Icons.cardNumber
        className={cn('absolute bottom-0 right-0 -z-10', cardStyle)}
      />
      <div className="h-full w-full">
        <h3 className="text-center font-semibold text-white drop-shadow-dark">
          #{formatterId(pokemonId)}
        </h3>
      </div>
    </div>
  )
}
