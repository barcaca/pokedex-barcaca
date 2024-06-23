import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { buttonVariants } from './ui/button'

/**
 * An array of objects representing social media icons and their corresponding links.
 * Each object contains an icon component, a href link, and a title.
 */
const socialsItems = [
  {
    icon: <Icons.github className="size-6 fill-foreground" />,
    href: 'https://github.com/barcaca/pokedex-barcaca',
    title: 'Github',
  },
  {
    icon: <Icons.linkedin className="size-6 fill-[#0A66C2]" />,
    href: 'https://www.linkedin.com/in/luan-barcaça/',
    title: 'Linkedin',
  },
]

/**
 * A component that renders a list of social media icons as links.
 */
export function Social() {
  return (
    <div className="flex min-h-[52px] items-center gap-3 rounded-md">
      {socialsItems.map((item) => {
        return (
          <Link
            key={item.title}
            href={item.href}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-full p-2',
            )}
          >
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}
