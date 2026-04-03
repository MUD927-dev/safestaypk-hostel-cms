import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand Column */}
                    <div className="footer__brand">
                        <div className="footer__brand-name">
                            <div className="navbar__logo">S</div>
                            SafeStayPK
                        </div>
                        <p className="footer__description">
                            Pakistan&apos;s most trusted platform for verified student hostel
                            accommodations. Ensuring safety, comfort, and peace of mind for
                            students and parents.
                        </p>
                        <div className="footer__socials">
                            <a href="#" className="footer__social-link" aria-label="Facebook">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a href="#" className="footer__social-link" aria-label="Twitter">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="#" className="footer__social-link" aria-label="Instagram">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="17.5" cy="6.5" r="1.5" />
                                </svg>
                            </a>
                            <a href="#" className="footer__social-link" aria-label="LinkedIn">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__column">
                        <h4>Quick Links</h4>
                        <div className="footer__links">
                            <Link href="/hostels" className="footer__link">Find Hostels</Link>
                            <Link href="/list-property" className="footer__link">List Your Property</Link>
                            <Link href="/safety" className="footer__link">Safety Guidelines</Link>
                            <Link href="/help" className="footer__link">Help Center</Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="footer__column">
                        <h4>Contact Info</h4>
                        <div className="footer__contact-item">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                            +92 300 1234567
                        </div>
                        <div className="footer__contact-item">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            info@safestaypk.com
                        </div>
                        <div className="footer__contact-item">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Gulshan-e-Iqbal, Karachi, Pakistan
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>
                        © 2024 SafeStayPK. All rights reserved. |{' '}
                        <Link href="/privacy">Privacy Policy</Link> |{' '}
                        <Link href="/terms">Terms of Service</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
