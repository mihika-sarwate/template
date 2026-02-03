'use client'

import React from 'react'
import { SectionProps } from '@/lib/sections/registry'

export function FAQSection({ heading, faqs }: SectionProps) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null)

  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {heading && <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center' }}>{heading}</h2>}

        {faqs && faqs.length > 0 && (
          <div>
            {faqs.map((faq: any, idx: number) => (
              <div
                key={idx}
                style={{
                  marginBottom: '20px',
                  borderBottom: '1px solid #ddd',
                  paddingBottom: '20px',
                }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '15px 0',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {faq.question}
                  <span style={{ marginLeft: '10px' }}>{openIdx === idx ? '▼' : '▶'}</span>
                </button>

                {openIdx === idx && faq.answer && (
                  <p style={{ marginTop: '15px', color: '#666', lineHeight: '1.6' }}>{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
