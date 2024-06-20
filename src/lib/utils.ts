import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * This function formats an id number to a string with leading zeros.
 * @param id - The number to be formatted.
 * @returns A string representation of the input number with leading zeros.
 *
 * @example
 * ```typescript
 * const formattedId = formatterId(12); // formattedId = "0012"
 * ```
 */
export function formatterId(id: number): string {
  return String(id).padStart(4, '0')
}
/**
 * This function formats a name string to have the first letter capitalized.
 * @param name - The string to be formatted.
 * @returns A string representation of the input name with the first letter capitalized.
 *
 * @example
 * ```typescript
 * const formattedName = formatterName('john'); // formattedName = "John"
 * ```
 */
export function formatterName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/**
 * This function formats a height number to a decimal value.
 * @param height - The number to be formatted. It should be a whole number representing the height in centimeters.
 * @returns A decimal representation of the input height. The returned value is in meters.
 */
export function formattedHeight(height: number): number {
  return height * 10
}
/**
 * This function formats a weight number to a decimal value.
 * @param weight - The number to be formatted.
 * @returns A decimal representation of the input weight.
 */
export function formattedWeight(weight: number): number {
  return weight / 10
}
