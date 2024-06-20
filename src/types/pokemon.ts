import { IPokemonType } from './pokemon-types'

/**
 * The name and the URL of the referenced resource
 */
export interface APIResource {
  /** The name of the referenced resource */
  name: string
  /** The URL of the referenced resource */
  url: string
}
/**
 * Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API.
 */
export interface APIResourceList {
  /** The total number of resources available from this API */
  count: number
  /** The URL for the next page in the list */
  next: string | null
  /** The URL for the previous page in the list */
  previous: string | null
  /** A list of named API resources */
  results: APIResource[]
}
/** Official Artwork sprites */
export interface OfficialArtwork {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null
}
/** Other Pokemon Sprites (Dream World and Official Artwork sprites) */
export interface OtherPokemonSprites {
  /** Official Artwork Sprites of this Pokémon */
  'official-artwork': OfficialArtwork
}
/**
 * A set of sprites used to depict this Pokémon in the game.
 */
export interface IPokemonSprites {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null
  /** Dream World, Official Artwork and Home sprites */
  other?: OtherPokemonSprites
}

/**
 * Base stat values for the given Pokémon
 */
export interface IPokemonStat {
  /** The stat the Pokémon has */
  stat: APIResource
  /** The effort points (EV) the Pokémon has in the stat */
  effort: number
  /** The base value of the stat */
  base_stat: number
}

/**
 * Interface that describes the characteristics of a Pokémon.
 */
export interface IPokemon {
  /** The identifier for this resource */
  id: number
  /** The name for this resource */
  name: string
  /** The height of this Pokémon in decimetres */
  height: number
  /** The weight of this Pokémon in hectograms */
  weight: number
  /** A set of sprites used to depict this Pokémon in the game. */
  sprites: IPokemonSprites
  /** A list of base stat values for this Pokémon */
  stats: IPokemonStat[]
  /** A list of details showing types this Pokémon has */
  types: IPokemonType[]
}
/**
 * The localized flavor text for an API resource in a specific language
 */
export interface IFlavorText {
  /** The localized flavor text for an API resource in a specific language */
  flavor_text: string
  /** The language this name is in */
  language: APIResource
  /** The game version this flavor text appears in */
  version: APIResource
}
export interface IPokemonSpecies {
  /** The identifier for this resource */
  id: number
  /** The name for this resource */
  name: string
  /** The Pokémon species that evolves into this Pokemon_species */
  evolves_from_species: APIResource
  /** The evolution chain this Pokémon species is a member of */
  evolution_chain: { url: string }
  /** A list of flavor text entries for this Pokémon species */
  flavor_text_entries: IFlavorText[]
}
