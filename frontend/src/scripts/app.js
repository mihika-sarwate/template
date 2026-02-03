/**
 * MAIN APPLICATION SCRIPT
 * 
 * Fetches content from Sanity CMS and renders the website dynamically.
 * All content updates in Sanity will appear on the website immediately.
 */

import { fetchAllContent } from '../utils/sanityClient.js'

// Global content object
let siteContent = {}

/**
 * Initialize the application
 */
async function init() {
  try {
    showLoading(true)
    
    // Fetch all content from Sanity (or use demo content)
    console.log('📋 Fetching content...')
    siteContent = await fetchAllContent()
    
    console.log('📦 Content loaded:', siteContent)
    
    if (!siteContent) {
      throw new Error('No content returned from Sanity')
    }

    // Render all sections
    renderNavbar()
    renderHero()
    renderAbout()
    renderServices()
    renderContact()
    renderFooter()

    // Update page metadata
    updatePageMetadata()

    // Apply theme colors if available
    applyThemeColors()

    console.log('✓ Website loaded successfully')
  } catch (error) {
    console.error('❌ Failed to load website:', error)
    showError(`Failed to load content: ${error.message}`)
  } finally {
    showLoading(false)
  }
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

/**
 * Render navbar with dynamic logo and links
 */
function renderNavbar() {
  const nav = document.querySelector('nav')
  const site = siteContent.site || {}
  const navbarData = siteContent.navbar || {}

  const links = navbarData.links
    ?.map(link => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join('') || ''

  nav.innerHTML = `
    <div class="navbar">
      <div class="navbar-logo">${site.logo || 'PS'}</div>
      <button class="mobile-menu-btn" aria-label="Toggle menu">☰</button>
      <ul class="navbar-menu">
        ${links}
      </ul>
    </div>
  `

  setupMobileMenu()
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
  const mobileBtn = document.querySelector('.mobile-menu-btn')
  const menu = document.querySelector('.navbar-menu')

  if (mobileBtn && menu) {
    mobileBtn.addEventListener('click', () => {
      menu.classList.toggle('active')
    })

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active')
      })
    })
  }
}

/**
 * Render hero section
 */
function renderHero() {
  const hero = document.querySelector('.hero')
  const heroData = siteContent.hero || {}
  const gradient = heroData.backgroundGradient || {}

  // Set background gradient
  if (gradient.fromColor && gradient.toColor) {
    hero.style.background = `linear-gradient(135deg, ${gradient.fromColor} 0%, ${gradient.toColor} 100%)`
  }

  const heroContent = document.querySelector('.hero-content')
  heroContent.innerHTML = `
    <h1>${heroData.headline || 'Welcome'}</h1>
    <p>${heroData.subheadline || ''}</p>
    <a href="${heroData.ctaLink || '#contact'}" class="btn btn-primary">
      ${heroData.ctaText || 'Get Started'}
    </a>
  `
}

/**
 * Render about section
 */
function renderAbout() {
  const aboutData = siteContent.about || {}
  const aboutText = document.querySelector('.about-text')
  const aboutHighlights = document.querySelector('.about-highlights')

  aboutText.innerHTML = `
    <h3>${aboutData.title || 'About Us'}</h3>
    <p>${aboutData.description || ''}</p>
  `

  const highlightsHTML = (aboutData.highlights || [])
    .map(
      item => `
      <div class="highlight">
        <span class="highlight-icon">${item.icon || '✓'}</span>
        <span class="highlight-text">${item.text || ''}</span>
      </div>
    `
    )
    .join('')

  aboutHighlights.innerHTML = highlightsHTML || '<p>No highlights available</p>'
}

/**
 * Render services/cards section
 */
function renderServices() {
  const servicesData = siteContent.services || []
  const servicesGrid = document.querySelector('.services-grid')
  const sectionTitle = document.querySelector('.section-title')

  // Update section title
  sectionTitle.innerHTML = `
    <h2>Our Services</h2>
    <p>Comprehensive solutions designed for your success</p>
  `

  if (!servicesData || servicesData.length === 0) {
    servicesGrid.innerHTML = '<p class="loading">No services available yet</p>'
    return
  }

  const cardsHTML = servicesData
    .map(
      service => `
      <div class="card" data-service-id="${service._id}">
        <div class="card-icon">${service.icon || '💼'}</div>
        <h3>${service.title || ''}</h3>
        <p>${service.description || ''}</p>
      </div>
    `
    )
    .join('')

  servicesGrid.innerHTML = cardsHTML
}

/**
 * Render contact section
 */
function renderContact() {
  const contactData = siteContent.contact || {}
  const site = siteContent.site || {}

  const contactTitle = document.querySelector('.contact .section-title')
  contactTitle.innerHTML = `
    <h2>${contactData.title || 'Get In Touch'}</h2>
    <p>${contactData.description || ''}</p>
  `

  // Render contact info
  const contactInfo = document.querySelector('.contact-info')
  contactInfo.innerHTML = `
    <div class="contact-item">
      <div class="contact-item-icon">✉️</div>
      <div>
        <h4>Email</h4>
        <p><a href="mailto:${site.email || 'hello@example.com'}">${site.email || 'hello@example.com'}</a></p>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-item-icon">📞</div>
      <div>
        <h4>Phone</h4>
        <p><a href="tel:${site.phone || '+'}">${site.phone || ''}</a></p>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-item-icon">📍</div>
      <div>
        <h4>Address</h4>
        <p>${site.address || ''}</p>
      </div>
    </div>
  `

  // Render form
  const contactForm = document.querySelector('.contact-form')
  const formFields = (contactData.formFields || [])
    .map(field => {
      if (field.type === 'textarea') {
        return `
          <div class="form-group">
            <label for="${field.name}">${field.placeholder}</label>
            <textarea 
              id="${field.name}"
              name="${field.name}"
              placeholder="${field.placeholder}"
              ${field.required ? 'required' : ''}
            ></textarea>
          </div>
        `
      }
      return `
        <div class="form-group">
          <label for="${field.name}">${field.placeholder}</label>
          <input 
            type="${field.type}"
            id="${field.name}"
            name="${field.name}"
            placeholder="${field.placeholder}"
            ${field.required ? 'required' : ''}
          />
        </div>
      `
    })
    .join('')

  contactForm.innerHTML = formFields + `
    <button type="submit" class="btn btn-primary form-submit">Send Message</button>
  `

  // Setup form handling
  contactForm.addEventListener('submit', handleFormSubmit)
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)
  
  console.log('Form submitted:', data)
  alert('Thank you for your message! We will get back to you soon.')
  e.target.reset()
  
  // TODO: Send to backend/email service
  // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
}

/**
 * Render footer
 */
function renderFooter() {
  const footerData = siteContent.footer || {}
  const footer = document.querySelector('footer')

  const socialLinks = (footerData.socialLinks || [])
    .map(link => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>`)
    .join('')

  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-copyright">
        ${footerData.copyright || '© 2024 All rights reserved.'}
      </div>
      <ul class="footer-links">
        ${socialLinks}
      </ul>
    </div>
  `
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Update page title and meta description
 */
function updatePageMetadata() {
  const site = siteContent.site || {}
  document.title = site.title || 'Professional Website'
  
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', site.description || '')
  }
}

/**
 * Apply theme colors from Sanity
 */
function applyThemeColors() {
  const site = siteContent.site || {}
  
  if (site.primaryColor) {
    document.documentElement.style.setProperty('--primary-color', site.primaryColor)
  }
  
  if (site.secondaryColor) {
    document.documentElement.style.setProperty('--secondary-color', site.secondaryColor)
  }
}

/**
 * Show/hide loading state
 */
function showLoading(show) {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.style.display = show ? 'block' : 'none'
  }
}

/**
 * Show error message
 */
function showError(message) {
  const errorDiv = document.createElement('div')
  errorDiv.className = 'error'
  errorDiv.textContent = message
  document.body.insertBefore(errorDiv, document.body.firstChild)
}

// ============================================
// START APPLICATION
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
