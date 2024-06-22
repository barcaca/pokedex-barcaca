import Image from 'next/image'

import { formatterId, formatterName } from '@/lib/utils'

import { SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'

interface PokemonSheetHeaderProps {
  pokemonId: number
  pokemonName: string
  pokemonImage?: string | null
  pokemonFlavorText: string
}
/**
 * A functional component that renders the header of a Pokémon sheet.
 * It includes the Pokémon image, name, ID, and flavor text.
 * @param props - The props for the component.
 * @param props.pokemonId - The ID of the Pokémon.
 * @param props.pokemonName - The name of the Pokémon.
 * @param props.pokemonImage - The image URL of the Pokémon.
 * @param props.pokemonFlavorText - The flavor text of the Pokémon.
 */
export function PokemonSheetHeader({
  pokemonId,
  pokemonName,
  pokemonImage,
  pokemonFlavorText,
}: PokemonSheetHeaderProps) {
  /**
   * Replaces specific characters in a text string with their corresponding replacements.
   * @param text - The text string to replace characters in.
   */
  function replaceText(text: string) {
    return text
      .replace(/\f/g, '\n')
      .replace(/\u00ad\n/g, '')
      .replace(/\u00ad/g, '')
      .replace(/ -\n/g, ' - ')
      .replace(/-\n/g, '-')
      .replace(/\n/g, ' ')
      .replace(/POKéMON/g, 'Pokémon')
  }

  return (
    <SheetHeader>
      {/* Render the Pokémon image */}
      <div className="flex w-full items-center justify-center">
        <Image
          width={200}
          height={200}
          src={pokemonImage ?? '/pokeball_icon.svg'}
          alt=""
          className="object-cover"
        />
      </div>
      {/* Render the Pokémon name, ID, and flavor text */}
      <div className="mt-4 flex flex-col items-start justify-between">
        <SheetTitle className="flex w-full justify-between text-lg">
          <span>{formatterName(pokemonName)}</span>
          <span>#{formatterId(pokemonId)}</span>
        </SheetTitle>
        <SheetDescription className="text-muted-foreground">
          {replaceText(pokemonFlavorText)}
        </SheetDescription>
      </div>
    </SheetHeader>
  )
}
