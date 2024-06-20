import { cache } from 'react'

import { APIResourceList, IPokemon, IPokemonSpecies } from '@/types/pokemon'
import {
  IChainLink,
  IEvolution,
  IEvolutionChain,
} from '@/types/pokemon-evolution'
import { IType } from '@/types/pokemon-types'

import { BASE_URL, ENDPOINTS } from './base'

/**
 * List Pokemons
 * @param page - The page number to fetch.
 * @param limit - The number of Pokemons to fetch per page.
 * @param pokemon - (Optional) The name of a specific Pokemon to fetch.
 * @returns A Promise that resolves to the fetched list of Pokemons.
 */
async function fetchListPokemons(
  page: number,
  limit: number,
  pokemon?: string,
): Promise<APIResourceList> {
  // Calculate the offset, limiting it to a maximum of 1025
  const calculatedOffset = Math.min((page - 1) * limit, 1025)

  // Calculate the number of Pokemons to fetch, limiting it to a maximum of 1025 - calculatedOffset
  const count = Math.min(limit, 1025 - calculatedOffset)

  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.POKEMON}?limit=${count}&offset=${calculatedOffset}`,
  )
  const data: APIResourceList = await response.json()
  return data
}
export const getListPokemons = cache(fetchListPokemons)

/**
 * Fetches a single Pokemon by its name.
 * @param name - The name of the Pokemon to fetch.
 * @returns A Promise that resolves to the fetched Pokemon data.
 */
async function fetchPokemon(name: string): Promise<IPokemon> {
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.POKEMON}/${name}`)
  const data: IPokemon = await response.json()
  return data
}

export const getPokemon = cache(fetchPokemon)

async function fetchPokemonSpecies(id: number): Promise<IPokemonSpecies> {
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.SPECIES}/${id}`)
  const data: IPokemonSpecies = await response.json()
  return data
}

export const getPokemonSpecies = cache(fetchPokemonSpecies)

async function fetchType(type: string): Promise<IType> {
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.TYPE}/${type}`)
  const data: IType = await response.json()
  return data
}

export const getType = cache(fetchType)

async function fetchEvolutions(url: string): Promise<IEvolution[]> {
  const evolutions: IEvolution[] = []
  const parts = url.split('/')
  const id = Number(parts[parts.length - 2])

  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.EVOLUTION}/${id}`)
  const data: IEvolutionChain = await response.json()

  async function traverseEvolutions(chain: IChainLink) {
    const speciesName = chain.species.name
    const pokemonDetails: IPokemon = await getPokemon(speciesName)

    evolutions.push({
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      sprites: pokemonDetails.sprites.other?.['official-artwork'].front_default,
      types: pokemonDetails.types,
    })

    if (chain.evolves_to.length > 0) {
      for (const evolution of chain.evolves_to) {
        await traverseEvolutions(evolution)
      }
    }
  }
  await traverseEvolutions(data.chain)

  return evolutions
}

export const getEvolutions = cache(fetchEvolutions)
