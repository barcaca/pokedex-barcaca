import Image from 'next/image'

import { Icons } from '../icons'
import { ThemeToggle } from '../theme/theme-toggle'
import { Badge } from '../ui/badge'

/**
 * An array of objects representing the technologies used in the application.
 * Each object contains a title (name of the technology) and an icon (React component).
 */
const buildItems = [
  {
    title: 'React',
    icon: <Icons.react className="size-6 fill-[#61DAFB]" />,
  },
  {
    title: 'NextJs',
    icon: <Icons.nextjs className="size-6 fill-foreground" />,
  },
  {
    title: 'Typescript',
    icon: <Icons.typescript className="size-6 fill-[#3178C6]" />,
  },
  {
    title: 'TailwindCSS',
    icon: <Icons.tailwindcss className="size-6 fill-[#06B6D4]" />,
  },
  {
    title: 'Shadcn/Ui',
    icon: <Icons.shadcnui className="size-6 fill-foreground" />,
  },
]

/**
 * Header component for the application.
 * Displays the theme toggle, logo, description, and a list of technologies used.
 */
export function Header() {
  return (
    <header className="p-3 md:p-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
        {/* Theme toggle component */}
        <ThemeToggle />

        {/* Application logo */}
        <Image
          priority
          width={250}
          height={92}
          src="/pokemon-logo.svg"
          alt="logo image written pokemon"
        />

        {/* Application description */}
        <h1 className="text-center text-muted-foreground">
          Unofficial representation of a pokedex using API called PokeApi
        </h1>
        {/* Technologies Used */}
        <div className="flex items-center gap-4">
          {/* Text indicating the technologies used */}
          <p className="text-muted-foreground">Built with</p>

          {/* List of badges for each technology used */}
          <div className="flex gap-2">
            {buildItems.map((item) => {
              return (
                <Badge
                  key={item.title}
                  title={item.title}
                  variant="outline"
                  className="p-2"
                >
                  {item.icon}
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
