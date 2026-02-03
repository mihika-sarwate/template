'use client'

import { SectionProps } from '@/lib/sections/registry'

export function HeroSection({ heading, subheading, backgroundImage, cta }: SectionProps) {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '40px',
          borderRadius: '8px',
        }}
      >
        {heading && <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>{heading}</h1>}
        {subheading && <p style={{ fontSize: '1.25rem', marginBottom: '30px' }}>{subheading}</p>}
        {cta?.text && (
          <a
            href={cta.link || '#'}
            style={{
              display: 'inline-block',
              backgroundColor: '#667eea',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '1.1rem',
            }}
          >
            {cta.text}
          </a>
        )}
      </div>
    </section>
  )
}
