import Image from 'next/image'

import { getEvolutions, getPokemonSpecies, getType } from '@/data/pokemon'
import {
  cn,
  formattedHeight,
  formattedWeight,
  formatterId,
  formatterName,
} from '@/lib/utils'
import { IPokemon } from '@/types/pokemon'
import { colors } from '@/types/pokemon-types'

import { PokemonBadge } from './pokemon-badge'
import { Separator } from './ui/separator'
import { SheetContent } from './ui/sheet'
interface PokemonSheetProps {
  pokemon: IPokemon
}
export async function PokemonSheet({ pokemon }: PokemonSheetProps) {
  const speciesData = await getPokemonSpecies(pokemon.id)
  const typesData = await getType(pokemon.types[0].type.name)

  const [species, types] = await Promise.all([speciesData, typesData])
  // const primaryType = pokemon.types[0].type.name
  // const cardStyle = colors[primaryType]?.badge || ''

  const evolutionData = await getEvolutions(species.evolution_chain.url)

  function replaceText(text: string) {
    return text
      .replace(/\f/g, '\n') // Substitui '\f' por '\n'
      .replace(/\u00ad\n/g, '') // Remove '\u00ad' seguido de '\n'
      .replace(/\u00ad/g, '') // Remove '\u00ad' sozinho
      .replace(/ -\n/g, ' - ') // Corrige padrão '-\n' para ' - '
      .replace(/-\n/g, '-') // Corrige padrão '-\n' para '-'
      .replace(/\n/g, ' ')
      .replace(/POKéMON/g, 'Pokémon')
  }
  return (
    <SheetContent className={cn('space-y-3 overflow-y-auto')}>
      <div className="flex w-full items-center justify-center">
        <Image
          width={200}
          height={200}
          src={
            pokemon.sprites.other?.['official-artwork'].front_default ??
            '/pokeball_icon.svg'
          }
          alt=""
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col items-start justify-between">
        <div className="flex w-full justify-between text-lg">
          <h4>{formatterName(pokemon.name)}</h4>
          <p>#{formatterId(pokemon.id)}</p>
        </div>
        <p className="text-muted-foreground">
          {replaceText(species.flavor_text_entries[1].flavor_text)}
        </p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <h3>Type</h3>
        <div className="flex gap-2">
          {pokemon.types.map((type) => {
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
      <Separator />
      <div className="flex items-center justify-between gap-4">
        <h3>Weakness</h3>
        <div className="flex flex-wrap justify-end gap-2">
          {types.damage_relations.double_damage_from.map((type) => {
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
      <Separator />
      <div className="flex flex-col gap-2">
        <h3>Information</h3>
        <div className="flex justify-between">
          <p className="flex gap-3">
            Height: <span>{formattedHeight(pokemon.height)} cm</span>
          </p>
          <p className="flex gap-3">
            Weight: <span>{formattedWeight(pokemon.weight)} kg</span>
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <h3>Stats</h3>
        <dl className="mt-2 divide-y border-b border-t border-border">
          {pokemon.stats.map((stats) => {
            return (
              <div
                key={stats.stat.name}
                className="flex justify-between py-3 text-sm font-medium"
              >
                <dt className="text-muted-foreground">
                  {stats.stat.name.toUpperCase()}
                </dt>
                <dd className="text-muted-foreground">{stats.base_stat}</dd>
              </div>
            )
          })}
        </dl>
      </div>
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
                  <div className="flex flex-col gap-1">
                    <h4>{formatterName(evo.name)}</h4>
                    <p>#{formatterId(evo.id)}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {evo.types.map((type) => {
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
    </SheetContent>
  )
}
