'use client';

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Contact Us</h1>
          <p className="page-hero__subtitle">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            {/* Contact Information Side */}
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>
                Whether you’re a student searching for the perfect hostel, a parent who wants peace of mind, or a hostel owner looking to partner with us, our team is ready to help.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method__icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="contact-method__details">
                    <h4>Phone Support</h4>
                    <span>+92 300 1234567</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method__icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="contact-method__details">
                    <h4>Email Us</h4>
                    <span>support@safestaypk.com</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method__icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="contact-method__details">
                    <h4>Head Office</h4>
                    <span>123 Tech Avenue, Johar Town, Lahore, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="contact-form">
              <h3>Send a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" className="form-control" placeholder="John Doe" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="form-control" placeholder="john@example.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" className="form-control" required style={{ appearance: 'auto' }}>
                    <option value="">Select a subject...</option>
                    <option value="student">Student Inquiry</option>
                    <option value="owner">Hostel Owner Partnership</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" className="form-control" placeholder="How can we help you?" required></textarea>
                </div>

                <button type="submit" className="btn btn--primary contact-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
