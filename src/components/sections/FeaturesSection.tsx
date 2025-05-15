import React from 'react';
import { CheckCircleIcon, ShieldCheckIcon, RefreshIcon, BadgeCheckIcon } from '@heroicons/react/outline';
import 'src/styles/components/features-section.css';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = React.memo(({ features }) => {
  try {
    if (!Array.isArray(features)) {
      console.warn('FeaturesSection: The "features" prop is not an array.');
      return (
        <section className="py-12 bg-black text-white">
          <div className="container mx-auto text-center">
            <p>Error: Invalid features data.</p>
          </div>
        </section>
      );
    }

    if (!features || features.length === 0) {
      return (
        <section className="py-12 bg-black text-white">
          <div className="container mx-auto text-center">
            <p>No features available at the moment.</p>
          </div>
        </section>
      );
    }

    return (
      <section className="py-12 bg-black text-white" aria-label="Features Section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-exo-2 text-red-500">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <div className="text-red-500 mb-4">
                  <feature.icon className="h-8 w-8 mx-auto" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-roboto">
                  {feature.title}
                </h3>
                <p className="text-white font-roboto">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error rendering FeaturesSection:', error);
    return (
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto">
          <p className="text-center">
            An error occurred while rendering the features section. Please try
            again later.
          </p>
        </div>
      </section>
    );
  }
});

FeaturesSection.displayName = 'FeaturesSection';

export default React.memo(FeaturesSection);