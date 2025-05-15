import React from 'react';
 import MinimalLayout from 'src/components/layout/MinimalLayout';
 import 'src/styles/pages/experience.css';
 

 interface TeamMember {\
  name: string;\
  role: string;\
  description: string;\
  imageSrc: string;\
  imageAlt: string;
 }
 

 const ExperiencePage: React.FC = React.memo(() => {
  const teamMembers: TeamMember[] = [
  {\
  name: 'John Doe',\
  role: 'Lead Developer',\
  description: 'Expert in Discord bot development and Valorant API integration. Responsible for core bot functionalities.',\
  imageSrc: '/valorant-bot-landing/public/img/team/john_doe.jpg',\
  imageAlt: 'John Doe - Lead Developer',\
  },\
  {\
  name: 'Jane Smith',\
  role: 'UI/UX Designer',\
  description: 'Designs user interfaces and experiences. Focuses on creating intuitive and engaging interactions.',\
  imageSrc: '/valorant-bot-landing/public/img/team/jane_smith.jpg',\
  imageAlt: 'Jane Smith - UI/UX Designer',\
  },\
  {\
  name: 'Mike Johnson',\
  role: '3D Artist',\
  description: 'Creates 3D models and animations for the landing page. Brings the Valorant Bot to life with stunning visuals.',\
  imageSrc: '/valorant-bot-landing/public/img/team/mike_johnson.jpg',\
  imageAlt: 'Mike Johnson - 3D Artist',\
  },\
  {\
  name: 'Emily Brown',\
  role: 'Backend Engineer',\
  description: 'Develops and maintains the server-side logic and database integrations for the Valorant Bot.',\
  imageSrc: '/valorant-bot-landing/public/img/team/emily_brown.jpg',\
  imageAlt: 'Emily Brown - Backend Engineer',\
  },\
  ];
 

  // Sanitize team member descriptions to prevent XSS vulnerabilities\
  const sanitizedTeamMembers = teamMembers.map((member) => ({\
  ...member,\
  description: member.description.replace(/[<>]/g, (tag) => ({\
  '<': '&lt;',\
  '>': '&gt;',\
  }[tag] || tag)),
  }));
 

  // Load images using import.meta.glob\
  const images = import.meta.glob('/public/img/team/*');
 

  // Check for invalid image paths in teamMembers\
  useEffect(() => {\
  teamMembers.forEach((member) => {\
  if (!member.imageSrc) {\
  console.error(`Team member ${member.name} has an invalid image path.`);\
  }\
  });\
  }, [teamMembers]);
 

  try {\
  return (\
  <div aria-label=\"Our Expertise Page\">\
  <MinimalLayout>\
  <h1 className=\"font-exo-2 text-3xl font-bold text-center mb-8 text-red-500\">\
  Our Expertise\
  </h1>\
  <p className=\"font-roboto text-white text-center mb-4\">\
  Our team is composed of experienced developers and designers with a\
  passion for Discord bot development and Valorant API integration.\
  We leverage our skills to create innovative and engaging experiences for\
  the Valorant community.\
  </p>\
  <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">\
  {sanitizedTeamMembers.map((member, index) => {\
  // Prevent rendering if image path is invalid\
  if (!member.imageSrc) return null;
 

  return (\
  <div key={index} className=\"text-center\">\
  <img\
  src={member.imageSrc}\
  alt={member.imageAlt}\
  className=\"rounded-full w-32 h-32 mx-auto object-cover object-center mb-2\"\
  loading=\"lazy\"\
  onError={() => console.error(`Failed to load image for ${member.name}`)}\
  />\
  <h2 className=\"font-roboto text-xl font-semibold text-white mb-2\">\
  {member.name}\
  </h2>\
  <p className=\"font-roboto text-white\">{member.description}</p>\
  </div>\
  );\
  })}\
  </div>\
  </MinimalLayout>\
  </div>\
  );\
  } catch (error: any) {\
  console.error('Error rendering ExperiencePage:', error);\
  return (\
  <div className=\"text-red-500 font-roboto\" aria-live=\"assertive\">\
  An error occurred while rendering the experience page.\
  </div>\
  );\
  }\
 });
 

 ExperiencePage.displayName = 'ExperiencePage';
 

 export default React.memo(ExperiencePage);