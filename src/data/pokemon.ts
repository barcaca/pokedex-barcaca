import { cache } from 'react'

import { APIResourceList } from '@/types/pokemon'

import { BASE_URL, ENDPOINTS } from './base'

/**
 * List Pokemons
 * @param offset The first item that you will get
 * @param limit How many Pokemons Stats per page
 * @returns A list of Pokemons
 */
async function fetchListPokemons(
  page: number,
  limit: number,
  pokemon?: string,
): Promise<APIResourceList> {
  const calculatedOffset = page > 1 ? (page - 1) * 10 : 0

  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.POKEMON}?limit=${limit}&offset=${calculatedOffset}`,
  )
  const data: APIResourceList = await response.json()
  return data
}
export const getListPokemons = cache(fetchListPokemons)
