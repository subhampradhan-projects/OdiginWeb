/**
 * WEBSITE CONTENT CONFIGURATION
 * 
 * This file is the single source of truth for all text and brand content on the site.
 * If you are not a developer, you can easily change the values below to update the website.
 */

export const BRAND_CONFIG = {
  name: 'ODIGIN',
  tagline: 'Atelier',
  location: 'Odisha, India',
  ceo: 'Subham Pradhan',
  motto: 'Families Over Factories',
  description: 'Odisha-based premium anti-fast fashion. Empowering household sewing businesses through ethical sourcing.',
  detailedPhilosophy: 'Led by CEO Subham Pradhan, ODIGIN is democratizing fashion manufacturing. We empower household sewing businesses, training them to become our partners in creating standardized, long-lasting products. Every piece is crafted at home, not in a factory.',
  shortPhilosophy: 'Premium, biodegradable, anti-fast fashion from Odisha, India.',
};

export const IMAGES = {
  // Main brand image used in the philosophy section
  philosophy: 'https://picsum.photos/seed/sewing/1000/1000?grayscale',
  // You can add more global images here
};

export const NAVIGATION = {
  links: [
    { name: 'Store', path: '/store' },
    { name: 'About', path: '/about' },
    { name: 'Journal', path: '/journal' },
  ],
  social: [
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' },
  ]
};

export const HOME_CONTENT = {
  hero: {
    title: 'Objects of Permanence',
    subtitle: 'Fall / Winter 2024 Collection',
    buttonText: 'Discover Collection',
  },
  featuredSection: {
    title: 'Essentials',
    subtitle: 'View All Series 01',
  },
  newsletter: {
    title: 'Join ODIGIN',
    description: 'Receive exclusive early access to new series and limited edition collection drops.',
    placeholder: 'EMAIL ADDRESS',
    buttonText: 'Subscribe',
  }
};

export const STORE_CONTENT = {
  title: 'Store',
  description: 'Explore our ethically sourced collection. Crafted with precision by household manufacturers in Odisha. Families over factories.',
  emptyState: {
    title: 'No objects found within these coordinates.',
    buttonText: 'Reset Collection Search',
  }
};

export const ABOUT_CONTENT = {
  title: 'Our Story',
  mission: {
    title: 'Families Over Factories',
    paragraph1: 'Based in Odisha, India, ODIGIN is more than a fashion label. We are a community-driven enterprise led by CEO Subham Pradhan, dedicated to the creation of premium, biodegradable, and long-lasting apparel.',
    paragraph2: 'Our primary agenda is ethical sourcing and democratizing fashion manufacturing. We are helping household sewing businesses get trained and become our partners in our standardized fashion products manufacturing.',
    paragraph3: 'Our motto is "Families Over Factories" as all the products sold are made at home, by household manufacturers and not in factories. This decentralized model ensures that fair wages and artisanal focus remain at the heart of every object we create.',
  },
  values: [
    {
      title: 'Ethical Sourcing',
      description: 'Every material is traced back to its origin, ensuring social and environmental accountability.'
    },
    {
      title: 'Biodegradable',
      description: 'We prioritize materials that return to the earth, minimizing our footprint for future generations.'
    },
    {
      title: 'Democratizing Craft',
      description: 'Training and empowering local households to become standardized manufacturing partners.'
    }
  ]
};

export const JOURNAL_CONTENT = {
  title: 'Journal',
  subtitle: 'Narratives of Craft, Community, and Conscious Design.',
  emptyState: 'No entries found in the archives.',
};

export const SIZING_CONTENT = {
  title: 'Sizing Guide',
  description: 'Precision fit for architectural silhouettes.',
  chart: [
    { size: 'XS', chest: '34-36"', waist: '28-30"', hips: '34-36"' },
    { size: 'S', chest: '36-38"', waist: '30-32"', hips: '36-38"' },
    { size: 'M', chest: '38-40"', waist: '32-34"', hips: '38-40"' },
    { size: 'L', chest: '40-42"', waist: '34-36"', hips: '40-42"' },
    { size: 'XL', chest: '42-44"', waist: '36-38"', hips: '42-44"' },
    { size: 'XXL', chest: '44-46"', waist: '38-40"', hips: '44-46"' },
  ]
};

export const SHIPPING_CONTENT = {
  title: 'Shipping & Returns',
  shipping: {
    title: 'Domestic & International',
    text: 'We ship from our hub in Odisha to customers worldwide. Domestic shipping within India typically takes 3-5 business days. International shipping ranges from 7-14 business days depending on the destination.'
  },
  returns: {
    title: 'Return Policy',
    text: 'We accept returns on all unworn items within 14 days of delivery. Due to our decentralized manufacturing model, we encourage precise sizing to reduce the environmental impact of shipping.'
  }
};

export const CONTACT_CONTENT = {
  title: 'Contact',
  email: 'atelier@odigin.com',
  address: 'Bhubaneswar, Odisha, India',
  hours: 'Mon - Fri, 10:00 - 18:00 IST',
  support: 'For order inquiries, please include your order number.'
};

export const PRIVACY_CONTENT = {
  title: 'Privacy Policy',
  lastUpdated: 'April 20, 2024',
  sections: [
    {
      title: 'Information Collection',
      content: 'We collect information you provide directly to us when you create an account, place an order, or communicate with our atelier. This may include your name, email address, postal address, and payment information.'
    },
    {
      title: 'Use of Information',
      content: 'We use the information we collect to process your orders, provide customer support, and send you technical notices, updates, and security alerts.'
    },
    {
      title: 'Artisanal Data Protection',
      content: 'Just as we protect the craftsmanship of our household manufacturers, we protect your data. We do not sell your personal information to third parties.'
    }
  ]
};

export const TERMS_CONTENT = {
  title: 'Terms of Service',
  lastUpdated: 'April 20, 2024',
  sections: [
    {
      title: 'Agreement to Terms',
      content: 'By accessing or using our services, you agree to be bound by these terms. If you do not agree to these terms, do not use our services.'
    },
    {
      title: 'Product Authenticity',
      content: 'All ODIGIN products are handmade by household manufacturing partners in Odisha. Variations in texture and finish are characteristics of the artisanal process and are not considered defects.'
    },
    {
      title: 'Intellectual Property',
      content: 'The architectural silhouettes, logo, and brand narratives are the intellectual property of ODIGIN Atelier.'
    }
  ]
};

export const FOOTER_CONTENT = {
  description: 'Based in Odisha, India. Empowering families over factories. Premium, biodegradable apparel.',
  copyright: `© ${new Date().getFullYear()} Odigin Atelier. All Rights Reserved.`,
};
