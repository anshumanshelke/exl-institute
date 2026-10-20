/**
 * Social Media Configuration - Single Source of Truth
 * Update URLs here to change them everywhere across the site
 */
export const SOCIAL_LINKS = [
  {
    platform: 'facebook',
    url: 'https://www.facebook.com/share/19eNv66ZDd/',
    label: 'EXL Institute on Facebook',
    icon: 'facebook'
  },
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/exlinstitute_12',
    label: 'EXL Institute on Instagram',
    icon: 'instagram'
  },
  {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/shalaka-kale-a190b3165',
    label: 'EXL Institute on LinkedIn',
    icon: 'linkedin'
  },
  {
    platform: 'youtube',
    url: 'https://youtube.com/@shalakakale3',
    label: 'EXL Institute on YouTube',
    icon: 'youtube'
  }
];

// Helper to get all platforms as an object (for backward compatibility)
export const SOCIAL_LINKS_MAP = SOCIAL_LINKS.reduce((acc, { platform, url }) => {
  acc[platform] = url;
  return acc;
}, {});

// Helper to get a specific URL by platform
export const getSocialUrl = (platform) => {
  const found = SOCIAL_LINKS.find(s => s.platform === platform);
  return found ? found.url : '';
};