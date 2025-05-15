import React from 'react';
import 'src/styles/layout/footer.css';

const Footer: React.FC = React.memo(() => {
  try {
    const currentYear = new Date().getFullYear();
    const githubURL = "https://github.com/valorant-bot/landing";

    return (
      <footer className="bg-black text-white py-4 text-center" aria-label="Footer">
        <div className="container mx-auto px-6">
          <p>
            © {currentYear} Valorant Bot. All rights reserved.{" "}
            <a
              href={githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500"
              aria-label="GitHub Repository"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Error rendering Footer:', error);
    return (
      <footer className="bg-black text-white py-4 text-center">
        <div className="container mx-auto px-6">
          <p>
            An error occurred while rendering the footer.
          </p>
        </div>
      </footer>
    );
  }
});

Footer.displayName = 'Footer';

export default Footer;