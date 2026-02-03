'use client'

import { SectionProps } from '@/lib/sections/registry'

export function FeaturesSection({ heading, description, features }: SectionProps) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {heading && <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>{heading}</h2>}
        {description && (
          <p style={{ fontSize: '1.1rem', marginBottom: '60px', textAlign: 'center', color: '#666' }}>
            {description}
          </p>
        )}

        {features && features.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {features.map((feature: any, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: '30px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                }}
              >
                {feature.icon && (
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                    {typeof feature.icon === 'string' ? feature.icon : '📌'}
                  </div>
                )}
                {feature.title && <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{feature.title}</h3>}
                {feature.description && <p style={{ color: '#666' }}>{feature.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
