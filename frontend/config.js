/**
 * CONFIGURATION
 * This file will be generated automatically by the setup script
 */

// In a real deployment, these come from environment variables
// For now, this is a placeholder that shows demo content
export const config = {
  sanity: {
    projectId: import.meta.env?.SANITY_PROJECT_ID || 'demo',
    dataset: import.meta.env?.SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  },
  // Flag to indicate if Sanity is configured
  isSanityConfigured: false, // Will be true after running setup script
}
