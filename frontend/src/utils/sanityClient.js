/**
 * SANITY CLIENT CONFIGURATION
 * 
 * This module initializes the Sanity client used for fetching content.
 * It handles authentication and API communication with your Sanity project.
 */

import { demoContent } from '../data/demoContent.js'

// Configuration - Will be set by setup script or environment variables
const SANITY_CONFIG = {
  projectId: '146e0vmd', // Replace with your project ID or leave empty for demo
  dataset: 'production',
  apiVersion: '2024-01-01', // Use current date
  useCdn: true, // Use CDN for faster responses (set false for real-time updates)
  token: '', // Optional: for authenticated requests
}

// Check if Sanity is properly configured
const isSanityConfigured = SANITY_CONFIG.projectId && SANITY_CONFIG.projectId !== '146e0vmd'

/**
 * Build Sanity API URL for GROQ queries
 * @param {string} query - GROQ query string
 * @returns {string} Full API URL
 */
function buildQuery(query) {
  const encodedQuery = encodeURIComponent(query)
  const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodedQuery}`
  return url
}

/**
 * Fetch data from Sanity using GROQ
 * @param {string} query - GROQ query string
 * @returns {Promise<any>} Query result data
 */
export async function fetchSanityData(query) {
  // Return demo data if Sanity not configured
  if (!isSanityConfigured) {
    console.log('📦 Demo mode: Sanity not configured')
    return { result: [] }
  }

  try {
    const url = buildQuery(query)
    const headers = {
      'Content-Type': 'application/json',
    }

    // Add authentication token if available
    if (SANITY_CONFIG.token) {
      headers['Authorization'] = `Bearer ${SANITY_CONFIG.token}`
    }

    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.statusCode}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`GROQ error: ${data.error.description}`)
    }

    return data.result
  } catch (error) {
    console.error('Failed to fetch from Sanity:', error)
    throw error
  }
}

/**
 * GROQ Queries - All queries used by the application
 * These are centralized for easy maintenance
 */
export const GROQ_QUERIES = {
  // Get all site configuration
  SITE: '*[_type == "site"][0]',

  // Get navigation links
  NAVBAR: '*[_type == "navbar"][0].links',

  // Get hero section
  HERO: '*[_type == "hero"][0]',

  // Get about section
  ABOUT: '*[_type == "about"][0]',

  // Get all services ordered by order field
  SERVICES: '*[_type == "service"] | order(order asc)',

  // Get contact section
  CONTACT: '*[_type == "contact"][0]',

  // Get footer
  FOOTER: '*[_type == "footer"][0]',

  // Get everything in one query (more efficient)
  ALL_CONTENT: `{
    "site": *[_type == "site"][0],
    "navbar": *[_type == "navbar"][0],
    "hero": *[_type == "hero"][0],
    "about": *[_type == "about"][0],
    "services": *[_type == "service"] | order(order asc),
    "contact": *[_type == "contact"][0],
    "footer": *[_type == "footer"][0]
  }`,
}

/**
 * Fetch all website content in one call (recommended)
 * Returns demo content if Sanity is not configured
 * @returns {Promise<object>} All content data
 */
export async function fetchAllContent() {
  // If Sanity not configured, return demo content
  if (!isSanityConfigured) {
    console.log('📦 Using demo content (Sanity not configured)')
    return demoContent
  }
  
  return fetchSanityData(GROQ_QUERIES.ALL_CONTENT)
}

/**
 * Fetch individual sections (if you don't need everything)
 */
export async function fetchSiteConfig() {
  return fetchSanityData(GROQ_QUERIES.SITE)
}

export async function fetchNavbar() {
  return fetchSanityData(GROQ_QUERIES.NAVBAR)
}

export async function fetchHero() {
  return fetchSanityData(GROQ_QUERIES.HERO)
}

export async function fetchAbout() {
  return fetchSanityData(GROQ_QUERIES.ABOUT)
}

export async function fetchServices() {
  return fetchSanityData(GROQ_QUERIES.SERVICES)
}

export async function fetchContact() {
  return fetchSanityData(GROQ_QUERIES.CONTACT)
}

export async function fetchFooter() {
  return fetchSanityData(GROQ_QUERIES.FOOTER)
}

export { demoContent, isSanityConfigured }

export default {
  fetchSanityData,
  fetchAllContent,
  fetchSiteConfig,
  fetchNavbar,
  fetchHero,
  fetchAbout,
  fetchServices,
  fetchContact,
  fetchFooter,
  GROQ_QUERIES,
  SANITY_CONFIG
}
