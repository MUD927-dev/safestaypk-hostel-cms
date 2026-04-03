'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar__brand">
          <div className="navbar__logo">S</div>
          SafeStayPK
        </Link>

        <ul className="navbar__links">
          <li>
            <Link href="/" className="navbar__link navbar__link--active">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="navbar__link">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="navbar__link">
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar__actions">
          <button className="btn btn--ghost">Login</button>
          <button className="btn btn--outline">Sign Up</button>
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'active' : ''}`}>
        <ul className="navbar__links">
          <li>
            <Link href="/" className="navbar__link navbar__link--active" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="navbar__link" onClick={() => setMobileOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="navbar__link" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="navbar__actions">
          <button className="btn btn--ghost">Login</button>
          <button className="btn btn--outline">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}
