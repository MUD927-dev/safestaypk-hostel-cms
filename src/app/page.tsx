import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">
              Find Safe &amp; Verified
              <br />
              Hostels for Students in
              <br />
              Pakistan
            </h1>
            <p className="hero__subtitle">
              Connect with trusted hostel accommodations that prioritize student
              safety, comfort, and academic success across Pakistan.
            </p>

            {/* Search Bar */}
            <div className="search-bar">
              <div className="search-bar__field">
                <label className="search-bar__label">City</label>
                <select className="search-bar__select">
                  <option value="">Select City</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                  <option value="peshawar">Peshawar</option>
                  <option value="quetta">Quetta</option>
                  <option value="faisalabad">Faisalabad</option>
                  <option value="multan">Multan</option>
                </select>
              </div>
              <div className="search-bar__field">
                <label className="search-bar__label">Budget</label>
                <select className="search-bar__select">
                  <option value="">Select Budget</option>
                  <option value="5000-10000">Rs 5,000 - 10,000</option>
                  <option value="10000-15000">Rs 10,000 - 15,000</option>
                  <option value="15000-20000">Rs 15,000 - 20,000</option>
                  <option value="20000-30000">Rs 20,000 - 30,000</option>
                  <option value="30000+">Rs 30,000+</option>
                </select>
              </div>
              <div className="search-bar__field">
                <label className="search-bar__label">Gender</label>
                <select className="search-bar__select">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="co-ed">Co-Ed</option>
                </select>
              </div>
              <button className="search-bar__btn">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Search
              </button>
            </div>
          </div>

          <div className="hero__image">
            <Image
              src="/hero-building.png"
              alt="Modern student hostel building"
              width={420}
              height={380}
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="why-choose">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose SafeStayPK?</h2>
            <p>
              We ensure every hostel meets our strict safety and quality
              standards for student accommodation.
            </p>
          </div>

          <div className="features-grid">
            {/* Verified Hostels */}
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--blue">
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3>Verified Hostels</h3>
              <p>
                Every hostel undergoes thorough verification including safety
                checks, facility inspections, and background verification of
                management.
              </p>
            </div>

            {/* Guardian Approval */}
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--indigo">
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3>Guardian Approval</h3>
              <p>
                Parents and guardians receive real-time updates and can approve
                accommodation choices through our secure platform.
              </p>
            </div>

            {/* SOS Safety */}
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--green">
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3>SOS Safety</h3>
              <p>
                24/7 emergency support system with instant alerts to guardians
                and local authorities for student safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="trust">
        <div className="container">
          <div className="trust__image">
            <Image
              src="/students-group.png"
              alt="Happy students in a hostel common room"
              width={420}
              height={350}
            />
          </div>

          <div className="trust__content">
            <h2>
              Trusted by Students &amp; Parents
              <br />
              Across Pakistan
            </h2>
            <p>
              SafeStayPK bridges the gap between students seeking quality
              accommodation and parents wanting peace of mind. Our platform
              ensures every hostel meets international safety standards while
              providing affordable options for students.
            </p>
            <p>
              With over 500+ verified hostels across major cities, we&apos;re
              committed to making student accommodation search simple, safe, and
              reliable.
            </p>

            <div className="trust__stats">
              <div className="trust__stat">
                <span className="trust__stat-number">500+</span>
                <span className="trust__stat-label">Verified Hostels</span>
              </div>
              <div className="trust__stat">
                <span className="trust__stat-number">15K+</span>
                <span className="trust__stat-label">Happy Students</span>
              </div>
              <div className="trust__stat">
                <span className="trust__stat-number">25+</span>
                <span className="trust__stat-label">Cities Covered</span>
              </div>
            </div>

            <Link href="/get-started" className="btn btn--primary">
              Get Started Today →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
