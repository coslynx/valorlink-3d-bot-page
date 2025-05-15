import React, { memo } from 'react';
import MinimalLayout from 'src/components/layout/MinimalLayout';
import 'src/styles/pages/about.css';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const AboutPage: React.FC = memo(() => {
  const teamMembers: TeamMember[] = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      description: 'Expert in Discord bot development and Valorant API integration. Responsible for core bot functionalities.',
      imageSrc: '/valorant-bot-landing/public/img/team/john_doe.jpg',
      imageAlt: 'John Doe - Lead Developer',
    },
    {
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      description: 'Designs user interfaces and experiences. Focuses on creating intuitive and engaging interactions.',
      imageSrc: '/valorant-bot-landing/public/img/team/jane_smith.jpg',
      imageAlt: 'Jane Smith - UI/UX Designer',
    },
    {
      name: 'Mike Johnson',
      role: '3D Artist',
      description: 'Creates 3D models and animations for the landing page. Brings the Valorant Bot to life with stunning visuals.',
      imageSrc: '/valorant-bot-landing/public/img/team/mike_johnson.jpg',
      imageAlt: 'Mike Johnson - 3D Artist',
    },
  ];

  // Sanitize team member descriptions to prevent XSS vulnerabilities
  const sanitizedTeamMembers = teamMembers.map((member) => ({
    ...member,
    description: member.description.replace(/[<>]/g, (tag) => ({
      '<': '&lt;',
      '>': '&gt;',
    }[tag] || tag)),
  }));

  try {
    return (
      <div aria-label="About Valorant Bot Page">
        <MinimalLayout>
          <h1 className="text-3xl font-bold text-center mb-8 font-exo-2 text-red-500">
            About Valorant Bot
          </h1>
          <p className="font-roboto text-white text-center mb-4 text-lg">
            Valorant Bot is a fan project designed to enhance the Valorant
            community experience on Discord. It offers automated rank checks,
            seamless verification, and other engaging features. Please note that
            this project is not affiliated with Riot Games.
          </p>

          <h2 className="text-2xl font-bold text-center mb-4 font-exo-2 text-red-500">
            Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sanitizedTeamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.imageSrc}
                  alt={member.imageAlt}
                  className="rounded-full w-32 h-32 mx-auto object-cover object-center mb-2"
                  loading="lazy"
                  onError={() => console.error(`Failed to load image for ${member.name}`)}
                />
                <h3 className="font-roboto text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="font-roboto text-white">
                  {member.description.length > 200
                    ? `${member.description.substring(0, 200)}...`
                    : member.description}
                </p>
              </div>
            ))}
          </div>
        </MinimalLayout>
      </div>
    );
  } catch (error: any) {
    console.error('Error rendering AboutPage:', error);
    return (
      <div className="text-red-500 font-roboto" aria-live="assertive">
        An error occurred while rendering the about page. Please try again
        later.
      </div>
    );
  }
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;