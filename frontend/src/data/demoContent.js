/**
 * DEMO CONTENT
 * This is fallback content shown when Sanity is not yet configured
 */

export const demoContent = {
  site: {
    name: 'Template Site',
    logo: 'TS',
    tagline: 'Your Professional Website',
  },
  navbar: {
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    heading: 'Welcome to Your Template',
    subheading: 'This is a remixable template powered by Sanity CMS',
    ctaText: 'Get Started',
    ctaLink: '#about',
    backgroundImage: null,
  },
  about: {
    heading: 'About This Template',
    description: 'This is a starter template that you can duplicate and customize. Connect your own Sanity project to start editing content.',
    highlights: [
      { title: 'Easy Setup', description: 'One command to create your site' },
      { title: 'CMS Powered', description: 'Edit content in Sanity Studio' },
      { title: 'Fully Customizable', description: 'Add your own sections' },
    ],
  },
  // Services should be an ARRAY, not nested object
  services: [
    {
      _id: '1',
      title: 'Section-Based Pages',
      description: 'Build pages by composing reusable sections',
      icon: '🧩',
    },
    {
      _id: '2',
      title: 'Sanity CMS',
      description: 'Manage all content from Sanity Studio',
      icon: '✏️',
    },
    {
      _id: '3',
      title: 'Template Ready',
      description: 'Click "Use this template" to create new sites',
      icon: '🚀',
    },
  ],
  contact: {
    heading: 'Get Started',
    description: 'Run the setup script to connect your Sanity project',
    email: 'hello@example.com',
    phone: '+1 (555) 000-0000',
  },
  footer: {
    companyName: 'Template Site',
    copyright: `© ${new Date().getFullYear()} All rights reserved`,
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com' },
      { platform: 'Twitter', url: 'https://twitter.com' },
    ],
  },
}
