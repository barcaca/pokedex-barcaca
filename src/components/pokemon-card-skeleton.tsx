import Image from 'next/image'

import { Skeleton } from './ui/skeleton'

/**
 * Skeleton component to simulate a Pokemon card while data is being loaded.
 * This component displays animated placeholders for the Pokémon name and image.
 */
export function PokemonCardSkeleton() {
  return (
    <Skeleton className="h-[270px] w-[220px]">
      <div className="h-full w-full p-2.5">
        <div className="flex h-full flex-col items-center justify-center py-10">
          <Skeleton className="h-[30px] w-[100px]" />
          <Image
            width={96}
            height={96}
            src={'/pokeball_icon.svg'}
            alt={''}
            className="animate-spin"
          />
          <Skeleton className="h-[22px] w-[105px]" />
        </div>
      </div>
    </Skeleton>
  )
}
