import { formattedHeight, formattedWeight } from '@/lib/utils'

interface PokemonSheetInfoProps {
  height: number
  weight: number
}
/**
 * A functional component that displays the height and weight of a Pokemon.
 * @param height - The height of the Pokemon in decimeters.
 * @param weight - The weight of the Pokemon in hectograms.
 */
export function PokemonSheetInfo({ height, weight }: PokemonSheetInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3>Information</h3>
      <div className="flex justify-between">
        <p className="flex gap-3">
          Height: <span>{formattedHeight(height)} cm</span>
        </p>
        <p className="flex gap-3">
          Weight: <span>{formattedWeight(weight)} kg</span>
        </p>
      </div>
    </div>
  )
}
