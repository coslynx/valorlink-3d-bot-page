import React, { memo } from 'react';
 import MinimalLayout from 'src/components/layout/MinimalLayout';
 import LandingHero from 'src/components/sections/LandingHero';
 import FeaturesSection from 'src/components/sections/FeaturesSection';
 import GallerySection from 'src/components/sections/GallerySection';
 import CtaSection from 'src/components/sections/CtaSection';
 import { CheckCircleIcon, ShieldCheckIcon, RefreshIcon, BadgeCheckIcon } from '@heroicons/react/outline';
 import 'src/styles/pages/home.css';
 

 interface HomePageProps {}
 

 const HomePage: React.FC<HomePageProps> = memo(() => {
  const features = React.useMemo(() => [
  {
  id: 'rank-check',
  title: 'Rank Tracking',
  description:
  'Effortlessly monitor Valorant player ranks with a simple command.',
  icon: CheckCircleIcon,
  },
  {
  id: 'verification',
  title: 'Seamless Verification',
  description:
  'Automate role assignment for a secure and well-managed community.',
  icon: ShieldCheckIcon,
  },
  {
  id: 'real-time-updates',
  title: 'Real-time Updates',
  description:
  'Keep your community informed about the latest Valorant news and updates.',
  icon: RefreshIcon,
  },
  {
  id: 'dynamic-leaderboards',
  title: 'Dynamic Leaderboards',
  description:
  'Fuel competition with automatically updated leaderboards.',
  icon: BadgeCheckIcon,
  },
  ], []);
 

  const images = React.useMemo(() => [
  {
  src: '/valorant-bot-landing/public/img/gallery/rank_updates.png',
  alt: 'Automated Rank Updates',
  caption: 'Automated Rank Updates in Discord',
  },
  {
  src: '/valorant-bot-landing/public/img/gallery/verification_process.png',
  alt: 'Interactive Verification Process',
  caption: 'Interactive Verification Process',
  },
  {
  src: '/valorant-bot-landing/public/img/gallery/leaderboard.png',
  alt: 'Automatic Leaderboard Generation',
  caption: 'Automatic Leaderboard Generation',
  },
  ], []);
 

  const sanitizedImages = React.useMemo(() => {
  return images.map((image) => {
  try {
  new URL(image.src);
  return {
  ...image,
  caption: image.caption ? image.caption.replace(/[<>]/g, (tag) => (tag === '<' ? '&lt;' : '&gt;')) : image.caption,
  };
  } catch (error) {
  console.error('Invalid image URL:', image.src);
  return {
  src: '/valorant-bot-landing/public/broken_image.svg',
  alt: `Broken Image - ${image.alt}`,
  caption: `Failed to load image: ${image.alt}`,
  };
  }
  });
  }, [images]);
 

  try {
  return (
  <div aria-label="Home Page">
  <MinimalLayout>
  <LandingHero />
  <FeaturesSection features={features} />
  <GallerySection images={sanitizedImages} />
  <CtaSection />
  </MinimalLayout>
  </div>
  );
  } catch (error: any) {
  console.error('Error rendering HomePage:', error);
  return (
  <div className="text-red-500 font-roboto" aria-live="assertive">
  An error occurred while rendering the home page. Please try again later.
  </div>
  );
  }
 });
 

 HomePage.displayName = 'HomePage';
 

 export default memo(HomePage);