import { APIResource } from './pokemon'
import { IPokemonType } from './pokemon-types'

/**
 * ## Chain Link
 * Contains evolution details for a Pokémon in the chain.
 * Each link references the next Pokémon in the natural evolution order
 */
export interface IChainLink {
  /** The Pokémon species at this point in the evolution chain */
  species: APIResource
  /** A List of chain objects */
  evolves_to: IChainLink[]
}
/**
 * ## Evolution Chain
 * Evolution chains are essentially family trees.
 * They start with the lowest stage within a family and detail
 * evolution conditions for each as well as Pokémon they can evolve
 * into up through the hierarchy.
 */
export interface IEvolutionChain {
  /** The identifier for this resource */
  id: number
  /**
   * The base chain link object. Each link contains evolution details for a Pokémon in the chain.
   * Each link references the next Pokémon in the natural evolution order
   */
  chain: IChainLink
}

/**
 * ## Evolution
 * Represents a Pokémon evolution.
 */
export interface IEvolution {
  id: number
  name: string
  sprites?: string | null
  types: IPokemonType[]
}
