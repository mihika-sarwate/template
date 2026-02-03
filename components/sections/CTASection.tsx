'use client'

import { SectionProps } from '@/lib/sections/registry'

export function CTASection({ heading, description, backgroundColor, buttons }: SectionProps) {
  return (
    <section
      style={{
        padding: '80px 20px',
        backgroundColor: backgroundColor || '#667eea',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {heading && <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{heading}</h2>}
        {description && <p style={{ fontSize: '1.1rem', marginBottom: '40px' }}>{description}</p>}

        {buttons && buttons.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {buttons.map((button: any, idx: number) => (
              <a
                key={idx}
                href={button.link || '#'}
                style={{
                  padding: '12px 30px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor:
                    button.style === 'secondary'
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'white',
                  color:
                    button.style === 'secondary'
                      ? 'white'
                      : '#667eea',
                  border: button.style === 'secondary' ? '2px solid white' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {button.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
