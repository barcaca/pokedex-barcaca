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
 * Fetches a list of Pokemons from the API.
 * @param page - The page number to fetch.
 * @param limit - The number of Pokemons to fetch per page.
 * @param pokemon - (Optional) The name of a specific Pokemon to fetch.
 * @returns A Promise that resolves to the fetched list of Pokemons.
 * If the `pokemon` parameter is provided, the function will filter the Pokemons by their names.
 * The function also handles pagination by calculating the offset and limiting the number of Pokemons fetched.
 */
async function fetchListPokemons(
  page: number,
  limit: number,
  pokemon?: string,
): Promise<APIResourceList> {
  // Calculate the offset, limiting it to a maximum of 1025
  const calculatedOffset = Math.min((page - 1) * limit, 1025)

  if (pokemon) {
    // Fetch all Pokémon data without pagination for filtering
    const response = await fetch(
      `${BASE_URL.REST}${ENDPOINTS.POKEMON}?limit=1025&offset=0`,
    )
    const data: APIResourceList = await response.json()

    // Filter Pokémon based on the search query
    const allFilteredPokemon = data.results.filter((item) =>
      item.name.toLowerCase().includes(pokemon.toLowerCase()),
    )
    // Determine the start and end index for pagination
    const startIndex = calculatedOffset
    const endIndex = startIndex + limit

    // Slice the filtered Pokémon array based on pagination limits
    const filteredPokemon = allFilteredPokemon.slice(startIndex, endIndex)

    // Total number of Pokémon that match the filter criteria
    const totalPokemons = allFilteredPokemon.length

    // Return filtered Pokémon data along with total count
    return { ...data, count: totalPokemons, results: filteredPokemon }
  }

  // Calculate the number of Pokemons to fetch, limiting it to a maximum of 1025 - calculatedOffset
  const count = Math.min(limit, 1025 - calculatedOffset)

  // Fetch Pokémon data with pagination parameters
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.POKEMON}?limit=${count}&offset=${calculatedOffset}`,
  )
  const data: APIResourceList = await response.json()

  // Return the fetched Pokémon data
  return data
}

export const getListPokemons = cache(fetchListPokemons)

/**
 * Fetches a single Pokemon by its name.
 * @param name - The name of the Pokemon to fetch.
 * @returns A Promise that resolves to the fetched Pokemon data.
 */
async function fetchPokemon(name: string): Promise<IPokemon> {
  // Make a GET request to fetch data about the Pokémon with the specified name
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.POKEMON}/${name}`)
  const data: IPokemon = await response.json()
  return data
}

export const getPokemon = cache(fetchPokemon)

/**
 * Fetches a single Pokemon species by its ID.
 * @param id - The ID of the Pokemon species to fetch.
 * @returns A Promise that resolves to the fetched Pokemon species data.
 */
async function fetchPokemonSpecies(id: number): Promise<IPokemonSpecies> {
  // Make a GET request to fetch species data about the Pokémon with the specified ID
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.SPECIES}/${id}`)
  const data: IPokemonSpecies = await response.json()
  return data
}

export const getPokemonSpecies = cache(fetchPokemonSpecies)

/**
 * Fetches information about a specific Pokémon type from the API.
 * @param type The name of the Pokémon type to fetch.
 * @returns A Promise resolving to an IType object representing the Pokémon type data.
 */
async function fetchType(type: string): Promise<IType> {
  // Make a GET request to fetch data about the Pokémon type with the specified name
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.TYPE}/${type}`)
  const data: IType = await response.json()
  return data
}

export const getType = cache(fetchType)

/**
 * Fetches the evolution chain of a Pokémon from the API.
 * @param url - The URL of the evolution chain to fetch.
 * @returns A Promise that resolves to an array of IEvolution objects representing the Pokémon evolutions.
 *
 * The function extracts the Pokémon ID from the URL, fetches the evolution chain data from the API,
 * and then traverses the evolution chain to build an array of IEvolution objects.
 * Each IEvolution object contains the ID, name, front_default sprite URL, and types of a Pokémon.
 *
 * The function uses recursion to handle nested evolutions.
 */
async function fetchEvolutions(url: string): Promise<IEvolution[]> {
  // Initialize an array to store evolution details
  const evolutions: IEvolution[] = []

  // Extract the Pokémon species ID from the provided URL
  const parts = url.split('/')
  const id = Number(parts[parts.length - 2])

  // Fetch the evolution chain data from the API
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.EVOLUTION}/${id}`)
  const data: IEvolutionChain = await response.json()

  // Helper function to recursively traverse the evolution chain
  async function traverseEvolutions(chain: IChainLink) {
    // Fetch Pokémon details based on the species name in the evolution chain
    const speciesName = chain.species.name
    const pokemonDetails: IPokemon = await getPokemon(speciesName)

    // Add evolution details to the evolutions array
    evolutions.push({
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      sprites: pokemonDetails.sprites.other?.['official-artwork'].front_default,
      types: pokemonDetails.types,
    })

    // Recursively traverse through each evolution chain link
    if (chain.evolves_to.length > 0) {
      for (const evolution of chain.evolves_to) {
        await traverseEvolutions(evolution)
      }
    }
  }

  // Start traversing the evolution chain from the root
  await traverseEvolutions(data.chain)

  // Return the array of evolution details
  return evolutions
}

export const getEvolutions = cache(fetchEvolutions)
