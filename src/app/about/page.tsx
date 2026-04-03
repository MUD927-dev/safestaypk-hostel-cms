import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | SafeStayPK',
  description: 'Learn about SafeStayPK and our mission to provide safe, verified hostel accommodations for students in Pakistan.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">About SafeStayPK</h1>
          <p className="page-hero__subtitle">
            We are dedicated to transforming the student accommodation experience in Pakistan by providing safe, verified, and comfortable spaces.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-grid__text">
              <h2>Our Mission</h2>
              <p>
                At SafeStayPK, we understand that moving away from home for education is a significant step. Our mission is to ease this transition by connecting students with trusted, high-quality hostels across Pakistan.
              </p>
              <p>
                We bridge the gap between reliable accommodation providers and students, ensuring peace of mind for both students and their parents. Whether you are moving to Lahore, Karachi, or Islamabad, we make finding your next home simple and secure.
              </p>
              
              <div style={{ marginTop: '32px' }}>
                <Link href="/contact" className="btn btn--primary">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="about-grid__image">
              <Image 
                src="/students-group.png" 
                alt="Students relaxing"
                width={600}
                height={500}
                priority
              />
            </div>
          </div>

          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do.</p>
          </div>

          <div className="features-grid">
            {/* Safety */}
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--blue">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.11v4.71c0 4.6-2.92 8.94-7 10-4.08-1.06-7-5.4-7-10V6.29l7-3.11z"/>
                </svg>
              </div>
              <h3>Safety First</h3>
              <p>We do not compromise when it comes to the security and well-being of our students.</p>
            </div>

            {/* Quality */}
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--indigo">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/>
                </svg>
              </div>
              <h3>Quality Assured</h3>
              <p>All our listed hostels undergo strict verification to meet premium quality standards.</p>
            </div>

            {/* Trust */}
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--green">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h3>Built on Trust</h3>
              <p>We foster a transparent ecosystem where students, parents, and owners can interact confidently.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
