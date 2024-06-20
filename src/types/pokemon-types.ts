import { APIResource } from './pokemon'
export type TypesName =
  | 'grass'
  | 'fire'
  | 'water'
  | 'electric'
  | 'ground'
  | 'rock'
  | 'fairy'
  | 'poison'
  | 'bug'
  | 'normal'
  | 'flying'
  | 'fighting'
  | 'psychic'
  | 'ghost'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'steel'

export interface TypeColors {
  card: string
  badge: string
}

export interface PokemonTypeColors {
  [key: string]: TypeColors
}

export const colors: PokemonTypeColors = {
  grass: {
    card: 'fill-green-500 stroke-green-500',
    badge: 'bg-green-600',
  },
  fire: {
    card: 'fill-orange-500 stroke-orange-500',
    badge: 'bg-orange-600',
  },
  electric: {
    card: 'fill-yellow-400 stroke-yellow-400',
    badge: 'bg-yellow-400',
  },
  water: {
    card: 'fill-blue-500 stroke-blue-500',
    badge: 'bg-blue-600',
  },
  normal: {
    card: 'fill-neutral-500 stroke-neutral-500',
    badge: 'bg-neutral-600',
  },
  fighting: {
    card: 'fill-red-500 stroke-red-500',
    badge: 'bg-red-600',
  },
  poison: {
    card: 'fill-fuchsia-500 stroke-fuchsia-500',
    badge: 'bg-fuchsia-600',
  },
  ground: {
    card: 'fill-amber-500 stroke-amber-500',
    badge: 'bg-amber-600',
  },
  flying: {
    card: 'fill-indigo-500 stroke-indigo-500',
    badge: 'bg-indigo-600',
  },
  psychic: {
    card: 'fill-rose-500 stroke-rose-500',
    badge: 'bg-rose-600',
  },
  bug: {
    card: 'fill-lime-500 stroke-lime-500',
    badge: 'bg-lime-600',
  },
  rock: {
    card: 'fill-amber-700 stroke-amber-700',
    badge: 'bg-amber-800',
  },
  ghost: {
    card: 'fill-purple-500 stroke-purple-500',
    badge: 'bg-purple-700',
  },
  ice: {
    card: 'fill-cyan-500 stroke-cyan-500',
    badge: 'bg-cyan-600',
  },
  dragon: {
    card: 'fill-violet-500 stroke-violet-500',
    badge: 'bg-violet-600',
  },
  dark: {
    card: 'fill-slate-500 stroke-slate-500',
    badge: 'bg-slate-700',
  },
  steel: {
    card: 'fill-gray-400 stroke-gray-400',
    badge: 'bg-gray-500',
  },
  fairy: {
    card: 'fill-pink-500 stroke-pink-500',
    badge: 'bg-pink-600',
  },
}

/**
 * Details showing types the given Pokémon has
 */
export interface IPokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number
  /** The type the referenced Pokémon has */
  type: APIResource & { name: TypesName }
}

/**
 * Details showing types
 */
export interface IType {
  id: number
  name: TypesName
  damage_relations: {
    double_damage_from: APIResource[]
  }
}
