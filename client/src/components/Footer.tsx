import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2025 David Zhao. All Rights Reserved.</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((link) => (
          <Link
            key={link}
            href={`/${link.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
