/**
 * Base Url of the PokéAPI
 */
export const BASE_URL = {
  REST: 'https://pokeapi.co/api/v2',
} as const
/**
 * Endpoints of the PokéAPI
 */
export const ENDPOINTS = {
  POKEMON: '/pokemon',
  SPECIES: '/pokemon-species',
  TYPE: '/type',
  EVOLUTION: '/evolution-chain',
} as const
