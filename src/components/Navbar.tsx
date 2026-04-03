'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const pathname = usePathname();

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setMobileOpen(false); // Close mobile menu if open
  };

  const isActive = (path: string) => {
    return pathname === path ? ' navbar__link--active' : '';
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="navbar__brand">
            <div className="navbar__logo">S</div>
            SafeStayPK
          </Link>

          <ul className="navbar__links">
            <li>
              <Link href="/" className={`navbar__link${isActive('/')}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={`navbar__link${isActive('/about')}`}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`navbar__link${isActive('/contact')}`}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="navbar__actions">
            <button className="btn btn--ghost" onClick={() => openAuthModal('login')}>Login</button>
            <button className="btn btn--outline" onClick={() => openAuthModal('register')}>Sign Up</button>
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
              <Link href="/" className={`navbar__link${isActive('/')}`} onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={`navbar__link${isActive('/about')}`} onClick={() => setMobileOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`navbar__link${isActive('/contact')}`} onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__actions">
            <button className="btn btn--ghost" onClick={() => openAuthModal('login')}>Login</button>
            <button className="btn btn--outline" onClick={() => openAuthModal('register')}>Sign Up</button>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </>
  );
}
