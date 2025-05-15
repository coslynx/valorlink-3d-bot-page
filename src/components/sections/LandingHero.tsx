import React from 'react';
import { motion } from 'framer-motion';
import ThreeScene from 'src/components/3d/ThreeScene';
import RadianiteCrate from 'src/components/3d/Models/RadianiteCrate';
import Button from 'src/components/ui/Button';
import 'src/styles/components/landing-hero.css';

interface LandingHeroProps {}

const LandingHero: React.FC<LandingHeroProps> = React.memo(() => {
  try {
    const handleClick = () => {
      // Placeholder for Add to Discord button click handler
      console.log('Add to Discord button clicked');
    };

    return (
      <section
        className="bg-black text-white py-24 relative overflow-hidden"
        aria-label="Landing Hero Section"
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            className="font-roboto text-5xl font-bold text-center md:text-left md:text-6xl lg:text-7xl mb-4 text-red-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Level Up Your Valorant Community
          </motion.h1>
          <motion.p
            className="font-roboto text-md text-center md:text-left md:text-lg mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Unlock powerful tools to manage and engage your Valorant Discord
            server.Automated rank checks, seamless verification, and more!
          </motion.p>
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button onClick={handleClick}>Add to Discord</Button>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          <ThreeScene>
            <RadianiteCrate />
          </ThreeScene>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error rendering LandingHero:', error);
    return (
      <section className="bg-black text-white py-20 text-center">
        <div className="container mx-auto">
          <p>
            An error occurred while rendering the hero section. Please try again
            later.
          </p>
        </div>
      </section>
    );
  }
});

LandingHero.displayName = 'LandingHero';

export default React.memo(LandingHero);