/**
 * DEBUG TEST SCRIPT
 * Run this to test if all imports work correctly
 */

import { fetchAllContent, demoContent, isSanityConfigured } from './utils/sanityClient.js'

console.log('✅ Imports successful')
console.log('🔍 Sanity configured:', isSanityConfigured)
console.log('📦 Demo content available:', !!demoContent)
console.log('📦 Demo content keys:', Object.keys(demoContent))

// Test fetch
async function test() {
  try {
    const content = await fetchAllContent()
    console.log('✅ fetchAllContent worked')
    console.log('📦 Content:', content)
    console.log('🏠 Hero heading:', content?.hero?.heading)
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

test()
