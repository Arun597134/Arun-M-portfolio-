import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="container footer-wrapper">
        <div className="footer-left">
          <span>&copy; {currentYear} Arun M. All rights reserved.</span>
        </div>
        <div className="footer-right">
          <span>Made with ❤️ by Arun M</span>
        </div>
      </div>
    </footer>
  );
}
