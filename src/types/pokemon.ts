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
