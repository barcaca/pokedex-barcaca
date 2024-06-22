import { IPokemonStat } from '@/types/pokemon'

interface PokemonSheetStatsProps {
  stats: IPokemonStat[]
}
/**
 * A functional component that renders a list of a Pokemon's stats.
 * @param stats - An array of objects representing a Pokemon's stats.
 * Each object contains a `stat` object with a `name` property and a `base_stat` property.
 */
export function PokemonSheetStats({ stats }: PokemonSheetStatsProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3>Stats</h3>
      <dl className="mt-2 divide-y border-b border-t border-border">
        {stats.map((stat) => {
          return (
            <div
              key={stat.stat.name}
              className="flex justify-between py-3 text-sm font-medium"
            >
              <dt className="text-muted-foreground">
                {stat.stat.name.toUpperCase()}
              </dt>
              <dd className="text-muted-foreground">{stat.base_stat}</dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
