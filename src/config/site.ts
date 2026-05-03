export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  domain: string;
  fromName: string;
  navLinks: { label: string; href: string }[];
  footer: {
    text: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'WebJuice',
  tagline: 'Fast Websites for B2B Companies',
  description: 'Astro + Cloudflare stack. No WordPress. Just fast, secure, automated websites.',
  email: 'hello@fengtalk.ai',
  domain: 'fengtalk.ai',
  fromName: 'WebJuice',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Cases', href: '/cases' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: {
    text: 'Built with Astro + Cloudflare.',
  },
};
