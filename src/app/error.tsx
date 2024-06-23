'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

/**
 * Error component for Next.js applications.
 * It displays an error message and a button to navigate back to the previous page.
 *
 * @param error - The error object that needs to be displayed. It should be of type Error and can optionally have a 'digest' property.
 */
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const router = useRouter()
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col items-center gap-8">
      <h2>Something went wrong!</h2>
      <Button variant={'outline'} onClick={() => router.back()}>
        Back to Home
      </Button>
    </div>
  )
}
