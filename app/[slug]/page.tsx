import { getPageBySlug, getAllPageSlugs } from '@/lib/sanity'
import { getSectionComponent, SectionProps } from '@/lib/sections/registry'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageParams {
  slug: string
}

/**
 * Dynamic page renderer
 * Fetches page data from Sanity and renders sections using the registry
 */
export default async function Page({ params }: { params: PageParams }) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <main>
      {/* Render each section in order */}
      {page.sections && page.sections.length > 0 ? (
        page.sections.map((section: SectionProps, idx: number) => {
          const Component = getSectionComponent(section._type)

          if (!Component) {
            console.warn(`No component found for section type: ${section._type}`)
            return null
          }

          return <Component key={section._key || idx} {...section} />
        })
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          <p>No sections added to this page yet.</p>
        </div>
      )}
    </main>
  )
}

/**
 * Generate static params for all pages at build time
 * Enables Static Generation (ISR) for all pages
 */
export async function generateStaticParams() {
  const pages = await getAllPageSlugs()
  return pages.map((page: any) => ({
    slug: page.slug,
  }))
}

/**
 * Enable Incremental Static Regeneration (ISR)
 * Revalidate every 60 seconds
 */
export const revalidate = 60
