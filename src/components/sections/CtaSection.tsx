import React, { useCallback } from 'react';
import Button from 'src/components/ui/Button';
import 'src/styles/components/cta-section.css';

interface CtaSectionProps {}

const CtaSection: React.FC<CtaSectionProps> = React.memo(() => {
  const handleClick = useCallback(() => {
    const buttonUrl = "https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands";

    const sanitizeInput = (input: string): string | null => {
      try {
        new URL(input);
        console.log("Valid URL:", input);
        return input;
      } catch (error) {
        console.error("Invalid URL:", error);
        return null;
      }
    };

    const safeUrl = sanitizeInput(buttonUrl);

    if (safeUrl) {
      console.log('Add to Discord button clicked - Safe URL:', safeUrl);
    } else {
      console.log('Add to Discord button clicked - Invalid URL, action prevented.');
    }
  }, []);

  try {
    return (
      <section
        className="py-12 bg-black text-white text-center"
        aria-label="Call to Action Section"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 font-exo-2 text-red-500">
            Ready to enhance your Discord server?
          </h2>
          <p className="text-lg mb-8 font-roboto">
            Add our Valorant Discord bot today and unlock powerful features for
            your community.
          </p>
          <Button onClick={handleClick}>Add to Discord</Button>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error rendering CtaSection:', error);
    return (
      <section className="py-12 bg-black text-white text-center">
        <div className="container mx-auto px-6">
          <p className="font-roboto">
            An error occurred while rendering the call-to-action section. Please
            try again later.
          </p>
        </div>
      </section>
    );
  }
});

CtaSection.displayName = 'CtaSection';

export default CtaSection;